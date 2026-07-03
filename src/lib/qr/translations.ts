// src/lib/qr/translations.ts
// Feature-local i18n. Not a site-wide framework. Wire formats are never translated.

export type Language = 'en' | 'nl' | 'pt' | 'fr'
export type QrMode = 'text' | 'wifi' | 'sepa'

export interface Translations {
  pageTitle: string
  pageLede: string
  languageLabel: string
  modes: Record<QrMode, string>
  // Text/URL
  textLabel: string
  textHint: string
  textPlaceholder: string
  textTooLong: string
  // WiFi
  wifiSsidLabel: string
  wifiPasswordLabel: string
  wifiEncryptionLabel: string
  wifiHiddenLabel: string
  wifiShow: string
  wifiHide: string
  encryption: Record<WifiEncryptionKey, string>
  wifiSsidRequired: string
  wifiPasswordRequired: string
  // SEPA
  sepaNameLabel: string
  sepaNameHint: string
  sepaIbanLabel: string
  sepaIbanHint: string
  sepaAmountLabel: string
  sepaAmountHint: string
  sepaRefLabel: string
  sepaRefHint: string
  sepaIbanInvalid: string
  sepaIbanValid: string
  sepaAmountInvalid: string
  sepaNameRequired: string
  sepaBelgiumNote: string
  sepaPreviewLabel: string
  // Preview / download
  previewLabel: string
  previewPlaceholder: string
  contentTooLong: string
  downloadPng: string
  downloadSvg: string
  // Help
  helpSummary: string
  helpBody: string
  privacyNote: string
}

export type WifiEncryptionKey = 'WPA' | 'WEP' | 'nopass'

export const translations: Record<Language, Translations> = {
  en: {
    pageTitle: 'QR Code Generator',
    pageLede: 'Generate a QR code for a link, a WiFi network, or a SEPA payment. Everything runs in your browser — nothing is uploaded or stored.',
    languageLabel: 'Language',
    modes: { text: 'Text / URL', wifi: 'WiFi', sepa: 'Bank Payment (SEPA)' },
    textLabel: 'Text or URL',
    textHint: 'anything you want to encode',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Too long — shorten to fit a scannable QR code',
    wifiSsidLabel: 'Network name (SSID)',
    wifiPasswordLabel: 'Password',
    wifiEncryptionLabel: 'Security',
    wifiHiddenLabel: 'Hidden network',
    wifiShow: 'Show',
    wifiHide: 'Hide',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'None (open)' },
    wifiSsidRequired: 'Enter a network name',
    wifiPasswordRequired: 'Enter a password',
    sepaNameLabel: 'Beneficiary',
    sepaNameHint: 'name on the account',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'account number',
    sepaAmountLabel: 'Amount',
    sepaAmountHint: 'in euro',
    sepaRefLabel: 'Reference',
    sepaRefHint: 'optional · max 140 chars',
    sepaIbanInvalid: 'This IBAN is not valid (check digits do not match)',
    sepaIbanValid: '✓ Valid IBAN',
    sepaAmountInvalid: 'Enter a valid amount',
    sepaNameRequired: 'Enter the beneficiary name',
    sepaBelgiumNote: 'For Belgian bank accounts only. Scan the QR code with your bank app to open a pre-filled transfer.',
    sepaPreviewLabel: 'Scan with your bank app',
    previewLabel: 'Scan with your app',
    previewPlaceholder: 'Fill in the form to see the QR code',
    contentTooLong: 'Content is too long to fit in a QR code',
    downloadPng: 'Download PNG',
    downloadSvg: 'Download SVG',
    helpSummary: 'How does this work?',
    helpBody: 'The QR code encodes your input in a standard format your phone recognises. For SEPA it follows the EPC069-12 standard used by European banking apps.',
    privacyNote: 'Privacy: everything happens in your browser. No server, no tracking, no storage.',
  },
  nl: {
    pageTitle: 'QR-code Generator',
    pageLede: 'Maak een QR-code voor een link, een WiFi-netwerk of een SEPA-betaling. Alles gebeurt in je browser — niets wordt geüpload of opgeslagen.',
    languageLabel: 'Taal',
    modes: { text: 'Tekst / URL', wifi: 'WiFi', sepa: 'Bankbetaling (SEPA)' },
    textLabel: 'Tekst of URL',
    textHint: 'alles wat je wil coderen',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Te lang — kort in voor een scanbare QR-code',
    wifiSsidLabel: 'Netwerknaam (SSID)',
    wifiPasswordLabel: 'Wachtwoord',
    wifiEncryptionLabel: 'Beveiliging',
    wifiHiddenLabel: 'Verborgen netwerk',
    wifiShow: 'Toon',
    wifiHide: 'Verberg',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'Geen (open)' },
    wifiSsidRequired: 'Voer een netwerknaam in',
    wifiPasswordRequired: 'Voer een wachtwoord in',
    sepaNameLabel: 'Begunstigde',
    sepaNameHint: 'naam op de rekening',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'rekeningnummer',
    sepaAmountLabel: 'Bedrag',
    sepaAmountHint: 'in euro',
    sepaRefLabel: 'Mededeling',
    sepaRefHint: 'optioneel · max 140 tekens',
    sepaIbanInvalid: 'Dit IBAN is niet geldig (controlecijfers kloppen niet)',
    sepaIbanValid: '✓ Geldig IBAN',
    sepaAmountInvalid: 'Voer een geldig bedrag in',
    sepaNameRequired: 'Voer de naam van de begunstigde in',
    sepaBelgiumNote: 'Enkel voor Belgische bankrekeningen. Scan de QR-code met je bankapp om een vooraf ingevulde overschrijving te openen.',
    sepaPreviewLabel: 'Scan met je bankapp',
    previewLabel: 'Scan met je app',
    previewPlaceholder: 'Vul het formulier in om de QR-code te zien',
    contentTooLong: 'Inhoud is te lang voor een QR-code',
    downloadPng: 'PNG downloaden',
    downloadSvg: 'SVG downloaden',
    helpSummary: 'Hoe werkt dit?',
    helpBody: 'De QR-code codeert je invoer in een standaardformaat dat je telefoon herkent. Voor SEPA volgt het de EPC069-12-standaard die Europese banking apps gebruiken.',
    privacyNote: 'Privacy: alles gebeurt in je browser. Geen server, geen tracking, geen opslag.',
  },
  pt: {
    pageTitle: 'Gerador de Código QR',
    pageLede: 'Gere um código QR para um link, uma rede WiFi ou um pagamento SEPA. Tudo acontece no seu navegador — nada é enviado ou armazenado.',
    languageLabel: 'Idioma',
    modes: { text: 'Texto / URL', wifi: 'WiFi', sepa: 'Pagamento bancário (SEPA)' },
    textLabel: 'Texto ou URL',
    textHint: 'qualquer coisa que queira codificar',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Demasiado longo — encurte para um código QR legível',
    wifiSsidLabel: 'Nome da rede (SSID)',
    wifiPasswordLabel: 'Palavra-passe',
    wifiEncryptionLabel: 'Segurança',
    wifiHiddenLabel: 'Rede oculta',
    wifiShow: 'Mostrar',
    wifiHide: 'Ocultar',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'Nenhuma (aberta)' },
    wifiSsidRequired: 'Introduza um nome de rede',
    wifiPasswordRequired: 'Introduza uma palavra-passe',
    sepaNameLabel: 'Beneficiário',
    sepaNameHint: 'nome na conta',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'número da conta',
    sepaAmountLabel: 'Montante',
    sepaAmountHint: 'em euros',
    sepaRefLabel: 'Referência',
    sepaRefHint: 'opcional · máx 140 caracteres',
    sepaIbanInvalid: 'Este IBAN não é válido (dígitos de controlo não correspondem)',
    sepaIbanValid: '✓ IBAN válido',
    sepaAmountInvalid: 'Introduza um montante válido',
    sepaNameRequired: 'Introduza o nome do beneficiário',
    sepaBelgiumNote: 'Apenas para contas bancárias belgas. Digitalize o código QR com a sua app bancária para abrir uma transferência pré-preenchida.',
    sepaPreviewLabel: 'Digitalize com a sua app bancária',
    previewLabel: 'Digitalize com a sua aplicação',
    previewPlaceholder: 'Preencha o formulário para ver o código QR',
    contentTooLong: 'O conteúdo é demasiado longo para um código QR',
    downloadPng: 'Descarregar PNG',
    downloadSvg: 'Descarregar SVG',
    helpSummary: 'Como funciona?',
    helpBody: 'O código QR codifica os seus dados num formato padrão que o seu telemóvel reconhece. Para SEPA segue a norma EPC069-12 usada pelas aplicações bancárias europeias.',
    privacyNote: 'Privacidade: tudo acontece no seu navegador. Sem servidor, sem rastreamento, sem armazenamento.',
  },
  fr: {
    pageTitle: 'Générateur de code QR',
    pageLede: 'Générez un code QR pour un lien, un réseau WiFi ou un paiement SEPA. Tout se passe dans votre navigateur — rien n\'est envoyé ni stocké.',
    languageLabel: 'Langue',
    modes: { text: 'Texte / URL', wifi: 'WiFi', sepa: 'Paiement bancaire (SEPA)' },
    textLabel: 'Texte ou URL',
    textHint: 'tout ce que vous voulez encoder',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Trop long — raccourcissez pour un code QR lisible',
    wifiSsidLabel: 'Nom du réseau (SSID)',
    wifiPasswordLabel: 'Mot de passe',
    wifiEncryptionLabel: 'Sécurité',
    wifiHiddenLabel: 'Réseau caché',
    wifiShow: 'Afficher',
    wifiHide: 'Masquer',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'Aucune (ouvert)' },
    wifiSsidRequired: 'Saisissez un nom de réseau',
    wifiPasswordRequired: 'Saisissez un mot de passe',
    sepaNameLabel: 'Bénéficiaire',
    sepaNameHint: 'nom sur le compte',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'numéro de compte',
    sepaAmountLabel: 'Montant',
    sepaAmountHint: 'en euros',
    sepaRefLabel: 'Communication',
    sepaRefHint: 'optionnel · max 140 caractères',
    sepaIbanInvalid: 'Cet IBAN n\'est pas valide (les chiffres de contrôle ne correspondent pas)',
    sepaIbanValid: '✓ IBAN valide',
    sepaAmountInvalid: 'Saisissez un montant valide',
    sepaNameRequired: 'Saisissez le nom du bénéficiaire',
    sepaBelgiumNote: 'Uniquement pour les comptes bancaires belges. Scannez le code QR avec votre application bancaire pour ouvrir un virement pré-rempli.',
    sepaPreviewLabel: 'Scannez avec votre application bancaire',
    previewLabel: 'Scannez avec votre application',
    previewPlaceholder: 'Remplissez le formulaire pour voir le code QR',
    contentTooLong: 'Le contenu est trop long pour un code QR',
    downloadPng: 'Télécharger PNG',
    downloadSvg: 'Télécharger SVG',
    helpSummary: 'Comment ça marche ?',
    helpBody: 'Le code QR encode vos données dans un format standard que votre téléphone reconnaît. Pour SEPA, il suit la norme EPC069-12 utilisée par les applications bancaires européennes.',
    privacyNote: 'Confidentialité : tout se passe dans votre navigateur. Pas de serveur, pas de suivi, pas de stockage.',
  },
}
