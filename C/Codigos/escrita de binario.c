#include <stdlib.h>
#include <stdio.h>

int main(){

  FILE * fb;
  fb = fopen("arquivo.dat", "wb");

  int v[5];

  for (int i=0; i<5; i++){
    printf("v[%d]: ", i);
    scanf("%d", &v[i]);
  }

  fwrite(v, sizeof(int), 5, fb);

  fclose(fb);
}
