/**
 * Configuração Centralizada de Dados Comerciais da Óticas Ipanema
 * Metodologia NEWNEO Web Architect
 *
 * REGRA RIGOROSA:
 * Não inventar dados comerciais (horários, marcas comercializadas, serviços clínicos,
 * preços atuais, promoções ou garantias).
 * Dados provenientes das referências da marca são mantidos centralizados e sujeitos
 * à confirmação final antes da publicação definitiva.
 */

export interface BusinessConfig {
  brand: {
    name: string;
    tagline: string;
    instagramUrl: string;
    instagramHandle: string;
    logoUrl?: string;
  };
  contact: {
    whatsappNumber: string | null;
    whatsappFormatted?: string;
    whatsappDefaultMessage: string;
    phone: string | null;
    email: string | null;
  };
  location: {
    address: string | null;
    neighborhood: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    googleMapsUrl: string | null;
    embedMapUrl: string | null;
  };
  schedule: {
    weekdays: string | null;
    saturday: string | null;
    sunday: string | null;
  };
  catalog: {
    brands: string[];
    services: string[];
  };
  domain: {
    productionUrl: string | null;
  };
  status: {
    isReferenceDataLoaded: boolean;
    isWhatsAppAvailable: boolean;
    isAddressAvailable: boolean;
    isScheduleConfirmed: boolean;
    isServicesConfirmed: boolean;
    isBrandsConfirmed: boolean;
    isDomainConfirmed: boolean;
  };
}

export const businessConfig: BusinessConfig = {
  brand: {
    name: 'Óticas Ipanema',
    tagline: 'Moda Óptica, Elegância e Sofisticação para o Seu Olhar',
    instagramUrl: 'https://www.instagram.com/oticasipanemaec/',
    instagramHandle: '@oticasipanemaec',
    logoUrl: undefined, // Aguardando vetor/arquivo oficial
  },
  contact: {
    whatsappNumber: '5519997617664',
    whatsappFormatted: '(19) 99761-7664',
    whatsappDefaultMessage: 'Olá! Gostaria de conhecer as armações e saber mais sobre o atendimento da Óticas Ipanema.',
    phone: null, // PENDENTE DE CONFIRMAÇÃO
    email: null, // PENDENTE DE CONFIRMAÇÃO
  },
  location: {
    address: 'Rua Sete de Setembro, 424',
    neighborhood: 'Centro',
    city: 'Engenheiro Coelho',
    state: 'SP',
    postalCode: null, // PENDENTE DE CONFIRMAÇÃO
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Sete+de+Setembro+424+Centro+Engenheiro+Coelho+SP',
    embedMapUrl: null, // PENDENTE DE CONFIRMAÇÃO
  },
  schedule: {
    weekdays: null, // PENDENTE DE CONFIRMAÇÃO — NÃO INVENTAR
    saturday: null, // PENDENTE DE CONFIRMAÇÃO — NÃO INVENTAR
    sunday: null, // PENDENTE DE CONFIRMAÇÃO — NÃO INVENTAR
  },
  catalog: {
    brands: [], // PENDENTE DE CONFIRMAÇÃO — NÃO INVENTAR
    services: [], // PENDENTE DE CONFIRMAÇÃO — NÃO INVENTAR
  },
  domain: {
    productionUrl: null, // PENDENTE DE CONFIRMAÇÃO
  },
  status: {
    // Dados identificados nas referências oficiais (@oticasipanemaec), sujeitos à confirmação antes da publicação
    isReferenceDataLoaded: true,
    isWhatsAppAvailable: true,
    isAddressAvailable: true,
    isScheduleConfirmed: false,
    isServicesConfirmed: false,
    isBrandsConfirmed: false,
    isDomainConfirmed: false,
  },
};

/**
 * Utilitário para gerar link do WhatsApp quando disponível
 */
export function getWhatsAppLink(): string | null {
  if (!businessConfig.contact.whatsappNumber) {
    return null;
  }
  const cleanNumber = businessConfig.contact.whatsappNumber.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(businessConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}
