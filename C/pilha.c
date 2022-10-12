#include <stdio.h>
#include <stdlib.h>
#define tam 10

struct pilha{
  int item[tam];
  int topo;
};

void init(struct pilha *ps){
  ps->topo = -1;
}

int vazia(struct pilha *ps){
  if(ps->topo == -1){
    return 1;
  }else{
    return 0;
  }
}

int cheia(struct pilha *ps){
  if(ps->topo == tam - 1){
    return 1;
  }else{
    return 0;
  }
}

void push(struct pilha *ps, int x){
  if(cheia(ps)){
    printf("Pilha cheia");
  }else{
    ps->topo += 1;
    ps->item[ps->topo] = x;
  }
}

int pop(struct pilha *ps){
  int x;
  if(vazia(ps)){
    printf("Pilha vazia");
    return -1;
  }else{
    x = ps->item[ps->topo];
    ps->topo -= 1;
    return x;
  }
}

int main(void) {
  struct pilha *ps;
  init(ps);
  
  push(ps,25);
  push(ps,12);
  push(ps,5);

  printf("%d", pop(ps));
  printf("%d", pop(ps));
  printf("%d", pop(ps));

}
