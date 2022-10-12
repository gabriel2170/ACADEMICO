#include <stdio.h>
#include <stdlib.h>
#define tam 10

void insertionSoft(vet[]){
  int i, j, atual;

  for(i=1; i < tam; i++){
    atual = vet[i];
    j = i - 1;
    
    while((j >= 0) && (atual < vet[j])){

      vet[j + 1] = vet[j];
      j = j - 1;
    }

    vet[j + 1] = atual;
  }
}


void mostrarLista(vet[]){
  for(int i=0; i < tam; i++){
    printf("%d ", vet[i]);
  }
}


int main(void) {

  int vet[tam] = {5,2,4,7,5,8,6,5,2,5};

  insertionSoft(vet);
  mostrarLista(vet);
}
