type TableHeadKey = keyof CallFormatted

type Mapping = Record<TableHeadKey,string>

const HEAD_TO_TRANSLATION_KEY: Mapping = {
    id: 'ID',
    date: 'Data',
    deviceName: 'Nazwa urządzenia',
    duration: 'Czas połączenia [s]',
    number: 'Numer',
    type: 'Typ'
  }
  
export default function translateTableKey(key: TableHeadKey){
    return HEAD_TO_TRANSLATION_KEY[key]
    }