export interface Vehicule {
  _id: string;
  marque: string;
  modele: string;
  annee?: number;
  categorie?: string;
  carburant?: string;
  boiteVitesse?: string;
  nbPlaces?: number;
  tarifJournalier: number;
  description?: string;
  image?: string;
  disponibilite: boolean;
  statutModeration?: "EN_ATTENTE" | "PUBLIE" | "REFUSE";
  motifRefus?: string;
  agence: {
    _id: string;
    raisonSociale: string;
    adresseAgence?: string;
  };
}

export interface Reservation {
  _id: string;
  client:
    | string
    | {
        _id: string;
        telephone?: string;
        user: { nom: string; prenom: string; email: string };
      };
  vehicule: {
    _id: string;
    marque: string;
    modele: string;
    tarifJournalier: number;
  };
  agence: {
    _id: string;
    raisonSociale: string;
  };
  dateDebut: string;
  dateFin: string;
  statut: "EN_ATTENTE" | "CONFIRMEE" | "REFUSEE" | "ANNULEE";
  messageAgence?: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  type: "NOUVELLE_RESERVATION" | "NOUVEAU_VEHICULE";
  message: string;
  lienType?: "RESERVATION" | "VEHICULE";
  lienId?: string;
  lue: boolean;
  createdAt: string;
}

export interface Agence {
  _id: string;
  raisonSociale: string;
  adresseAgence?: string;
  statutValidation: "EN_ATTENTE" | "ACTIF" | "SUSPENDU" | "REJETE";
  user: { nom: string; prenom: string; email: string };
  createdAt: string;
}