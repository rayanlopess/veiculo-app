import { inject, Injectable } from '@angular/core';
import { Database, ref, list, set, onValue, remove, get, update } from '@angular/fire/database';
import { firstValueFrom, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  constructor(
    private db: Database = inject(Database)
  ) { }

  ref(url: string){
    return ref(this.db, url);
  }

  list(url: string){
    return list(this.ref(url));
  }


  async getById(url: string, id: number): Promise<any> {
    const snapshot = await get(this.ref(`${url}/${id}`));
    return snapshot.exists() ? snapshot.val() : null;
  }




  add(url:string, data: any, id:number = 0){
    return from(
      (async () =>{
        let indice = 0;
        const snapshot:any = await firstValueFrom(this.list(url));

        if(snapshot !== undefined){
          indice = snapshot.length + 1;
        }

        const url_indice = id == 0 ? indice : id;
        const url_full = `${url}/${url_indice}`;
        const ref = this.ref(url_full);

        return set(ref, data)
      })()
    );
  }




  async update(path: string, id: string | number, data: any) {
    const dbRef = ref(this.db, `${path}/${id}`);
    try {
      await update(dbRef, data); // Atualiza apenas os campos especificados
      return true; // Sucesso
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      return false; // Falha
    }
  }

  // Seu método query já existente (para leitura em tempo real)
  query(url: string, callback: any) {
    return onValue(ref(this.db, url), callback);
  }




  async removeAndReindex(url: string, id: number) {
    try {
      // 1. Remove o item específico
      await remove(this.ref(`${url}/${id}`));
  
      // 2. Obtém todos os itens restantes
      const snapshot = await get(this.ref(url));
      const items: any[] = [];
  
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          items.push(child.val()); // Corrigido para val() em vez de values()
        });
      }
  
      // 3. Limpa o nó completo
      await remove(this.ref(url));
  
      // 4. Reinsere com novos IDs sequenciais
      for (let i = 0; i < items.length; i++) {
        await set(this.ref(`${url}/${i + 1}`), items[i]);
      }
    } catch (error) {
      console.error('Erro na reindexação:', error);
      throw error;
    }
  }


  async deleteAll(path: string): Promise<boolean> {
    const dbRef = ref(this.db, path);
    await remove(dbRef); // Deleta tudo no caminho especificado
    return true;
  }

}





