export function getDocumentTypeByBundle(bundle: string): string | undefined {
  return {
    'dlts_book': 'books',
    'dlts_map': 'maps',
  }[bundle];
}
