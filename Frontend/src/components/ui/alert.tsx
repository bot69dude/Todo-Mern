import * as AlertDialog from '@radix-ui/react-alert-dialog';

export function Alert({ 
  title, 
  description, 
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showTrigger = false
}: { 
  title: string; 
  description: string; 
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  showTrigger?: boolean;
}) {
  return (
    <AlertDialog.Root defaultOpen={!showTrigger}>
      {showTrigger && (
        <AlertDialog.Trigger className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Show Alert
        </AlertDialog.Trigger>
      )}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg animate-in zoom-in-90">
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end space-x-3">
            <AlertDialog.Cancel className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              {cancelText}
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={onConfirm}
              className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {confirmText}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}