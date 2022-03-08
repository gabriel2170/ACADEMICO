#include <stdio.h>
#include <stdlib.h>
#define tam 10

void bubbleSort(int vet[]){

  int aux;
  int x, y;

  for(x=0; x < tam; x++){
    for(y = x + 1; y < tam; y++){
      if(vet[x] > vet[y]){
        aux = vet[x];
        vet[x] = vet[y];
        vet[y] = aux;
      }
    }
  }

}

void mostrarLista(vet[]){
  for(int i=0; i < tam; i++){
    printf("%d ", vet[i]);
  }
}


int main(void) {

  int vet[tam] = {5,2,4,7,5,8,6,5,2,5};

  bubbleSort(vet);
  mostrarLista(vet);
}
