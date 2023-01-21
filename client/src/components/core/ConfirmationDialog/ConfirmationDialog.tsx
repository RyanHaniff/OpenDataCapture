import React from 'react';

import { HiExclamation, HiInformationCircle } from 'react-icons/hi';

import { Dialog, DialogTitle } from '../Dialog';

import { Button } from '@/components/base';
import { useDisclosure } from '@/hooks/useDisclosure';

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: 'danger' | 'info';
  isDone?: boolean;
};

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'Cancel',
  icon = 'danger',
  isDone = false
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure();

  const cancelButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: open
  });

  return (
    <>
      {trigger}
      <Dialog initialFocus={cancelButtonRef} isOpen={isOpen} onClose={close}>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="sm:flex sm:items-start">
            {icon === 'danger' && (
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <HiExclamation aria-hidden="true" className="h-6 w-6 text-red-600" />
              </div>
            )}

            {icon === 'info' && (
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <HiInformationCircle aria-hidden="true" className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </DialogTitle>
              {body && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{body}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              className="inline-flex w-full justify-center rounded-md border focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 sm:mt-0 sm:w-auto sm:text-sm"
              ref={cancelButtonRef}
              type="button"
              variant="inverse"
              onClick={close}
            >
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </div>
      </Dialog>
    </>
  );
};
