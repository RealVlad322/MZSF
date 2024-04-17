import { type EnqueueSnackbar } from 'notistack';

export async function copyToClipboard(
  text: string,
  enqueueSnackbar?: EnqueueSnackbar,
): Promise<void> {
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    enqueueSnackbar?.('Скопировано', {
      variant: 'success',
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      autoHideDuration: 2000,
    });
  } catch (err) {
    enqueueSnackbar?.('Копирование из браузера не поддерживается системой', {
      variant: 'error',
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      autoHideDuration: 2000,
    });
  }
}
