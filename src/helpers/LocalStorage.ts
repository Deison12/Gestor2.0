
//add local storage
export function addAll(formId: any, nit: any, quoteId: any, clientId: any) {
    localStorage.setItem('form1-ID', formId);
    localStorage.setItem('form_nit', nit);
    localStorage.setItem('form_quote_id', quoteId);
    localStorage.setItem('form_client_id', clientId);
}

//remove local storage
export function removeAll() {
    localStorage.removeItem('form1-ID');
    localStorage.removeItem('form_nit');
    localStorage.removeItem('form_client_id');
    localStorage.removeItem('form_quote_id');
    localStorage.removeItem('create_quote_id');
}
