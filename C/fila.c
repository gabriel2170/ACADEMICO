#include <stdio.h>
#include <stdlib.h>
#define tam 10


struct fila{
  int item[tam];
  int inicio, fim;
};

void init(struct fila *fi){
  fi->fim = -1;
  fi->inicio = 0;
}

int vazia(struct fila *fi){
  if(fi->fim < fi->inicio){
    return 1;
  }else{
    return 0;
  }
}

int cheia(struct fila *fi){
  if(fi->fim == tam - 1){
    return 1;
  }else{
    return 0;
  }
}


void insere(struct fila *fi, int x){
  if(cheia(fi)){
    printf("Fila cheia");
  }else{
    fi->fim =+ 1;
    fi->item[fi->fim] = x;
  }
}

int retira(struct fila *fi){
  int x;
  if(vazia(fi)){
    printf("Fila vazia");
    return -1;
  }else{
    fi->inicio += 1;
    x = fi->item[fi->inicio];
    return x;
  }
}

int main(){
  struct fila *fi;
  init(fi);
  insere(fi, 25);
  insere(fi, 12);
  insere(fi, 5);

  printf("%d", retira(fi));
  printf("%d", retira(fi));
  printf("%d", retira(fi));
}
