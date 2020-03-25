import { TestBed, async, inject } from '@angular/core/testing';

import { RedirectLoggedInToAdminGuard } from './redirect-logged-in-to-admin.guard';

describe('RedirectLoggedInToAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectLoggedInToAdminGuard]
    });
  });

  it('should ...', inject([RedirectLoggedInToAdminGuard], (guard: RedirectLoggedInToAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
