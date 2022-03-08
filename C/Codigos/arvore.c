# include <stdio.h>
# include <conio.h>
# include <stdlib.h>

struct arvore {
	int info;
	struct arvore *esq;
	struct arvore *dir;
};

struct arvore *raiz=NULL;

struct arvore *montaArvore(struct arvore *pai, struct arvore *filho, int x){
	struct arvore *p;
	if (filho==NULL){
		filho=(struct arvore *) malloc(sizeof(struct arvore));
		filho->info=x;
		filho->esq=NULL;
		filho->dir=NULL;
		if (pai==NULL)
		   return filho;
		
		if (x<pai->info)
		    pai->esq=filho;
		else
		    pai->dir=filho;
		
		return filho;
		
	}
	if (x<filho->info)
		montaArvore(filho,filho->esq,x);
	else 
	   if (x>filho->info)
	       montaArvore(filho,filho->dir,x);
	   else
	      printf("\nElemento ja cadastrado");
	      return NULL;
		
}

void incluiElemento(int x){
	if (raiz==NULL)
		raiz=montaArvore(NULL,raiz,x);
	else
		montaArvore(NULL,raiz,x);
}


void preOrdem(struct arvore *p){
	if(p){
		printf("%3d ", p->info);
		preOrdem(p->esq);
		preOrdem(p->dir);
	}
}

void emOrdem(struct arvore *p){
	if (p){
		emOrdem(p->esq);
		printf("%3d ", p->info);
		emOrdem(p->dir);
	}
}

void posOrdem(struct arvore *p){
	if (p){
		posOrdem(p->esq);
		posOrdem(p->dir);
		printf("%3d ", p->info);
	}
}

main(){

	raiz=NULL;
	incluiElemento(52);
	incluiElemento(45);
	incluiElemento(84);
	incluiElemento(38);
	incluiElemento(32);
	incluiElemento(40);
	incluiElemento(65);
	incluiElemento(98);
	emOrdem(raiz);
	printf("\n");
	preOrdem(raiz);
	printf("\n");
	posOrdem(raiz);


	
}
