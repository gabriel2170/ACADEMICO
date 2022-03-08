#include <stdio.h>
#include <stdlib.h>

int main(){
  FILE *fb;
  fb = fopen("arquivo.dat", "rb");

  if(fb == NULL){
    printf("arquivo nao pode ser aberto");
    exit(1);
  }

  int v[5];

  fread(v, sizeof(int), 5, fb);

  for(int i=0; i<5; i++){
    printf("v[%d]: ", i);
    scanf("%d", &v[i]);
  }
  fclose(fb);
}
