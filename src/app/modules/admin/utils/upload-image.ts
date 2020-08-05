import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { takeLast, map } from 'rxjs/operators';

export class UploadImage {
    waitingUpload = false;
    uploadComplete = false;
    selectedFile: File = null;
    imageUrl: string;
    uploadPercentage$: Observable<any>;

    constructor(protected storage: AngularFireStorage) {}

    uploadFile() {
        if (this.selectedFile === null) {
            return null;
        }

        this.waitingUpload = true;
        this.uploadComplete = false;
        const file = this.selectedFile;

        // Generate file name
        const date = new Date();
        const time = date.getTime();
        const fileName = time + file.name;

        const imagePath = `${environment.imageFolderPath}/${fileName}`;

        // Start file upload task
        const task = this.storage.upload(imagePath, file);

        // Get upload progress
        this.uploadPercentage$ = task
            .percentageChanges()
            .pipe(map((percentage) => percentage.toFixed(0)));

        // Get image HTTP URL
        const fileRef = this.storage.ref(imagePath);

        const lastSnapshot = task
            .snapshotChanges()
            .pipe(takeLast(1))
            .toPromise();

        return new Promise((resolve) => {
            lastSnapshot.then(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                    this.waitingUpload = false;
                    this.uploadComplete = true;

                    this.imageUrl = url;
                    resolve(url);
                });
            });
        });
    }
}
