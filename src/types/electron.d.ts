export interface IElectronAPI {
    ping: (req: string) => Promise<string>,
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }