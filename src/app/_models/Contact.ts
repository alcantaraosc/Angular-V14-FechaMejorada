
import {Option} from './Option';

export interface Contact {
    name: string;
    isVIP: boolean;
    gender: string;
    workStatus: number;
    company: string;
    education: string;
    listaOption: Option[];    
  }