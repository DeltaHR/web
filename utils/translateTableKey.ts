type TableHeadKey = keyof CallFormatted

type Mapping = Record<TableHeadKey,string>

const HEAD_TO_TRANSLATION_KEY: Mapping = {
    nr: '',
    id: 'ID',
    date: 'Data',
    deviceName: 'Nazwa urządzenia',
    duration: 'Czas połączenia',
    number: 'Numer',
    type: 'Typ'
  }
  
export default function translateTableKey(key: TableHeadKey){
    return HEAD_TO_TRANSLATION_KEY[key]
    }