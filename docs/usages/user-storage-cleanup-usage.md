# User Storage Cleanup

## Overview

This usage describes how the app removes a user's files from Firebase Storage when the account is deleted. Files are organized under a user-specific folder named with the user's ID.

## Behavior

- All files and subfolders under the user's folder are removed.
- Cleanup occurs on the client before the account deletion request is sent.
- Failures during cleanup are tolerated; the account deletion proceeds regardless.

## Structure

- Storage path convention: `{userId}/...`
- Service: `deleteUserFolderService(userId)` in `services/firebase/storage.service.ts`
- Hook: `useUserStorageCleanup()` in `hooks/storage/useUserStorageCleanup.ts`

## Integration

- The cleanup hook is invoked from `DeleteAccountModal` prior to the account removal.
- The hook exposes `deleteUserFolder(userId)` and provides `isCleaning` and `error` states.

## Notes

- Ensure the user is authenticated when invoking cleanup to satisfy Storage security rules.
- The removal is recursive and may take longer for accounts with many files.

