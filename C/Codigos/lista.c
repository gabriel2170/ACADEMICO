#include<conio.h>
#include<stdlib.h>
#include<stdio.h>

struct lista{  	
  int info;
	struct lista *proximo;              
};                               

struct lista *inicio;

void insereInicio(int x){
	struct lista *aux;
	aux=(struct lista *) malloc(sizeof(struct lista));
	aux->info = x;
	aux->proximo = inicio;
	inicio=aux;
}   
   
void removeInicio(){                   
	struct lista *q;                     
	if(inicio==NULL){
		printf("\nLista vazia");
		getch();
		return;
	}
	q=inicio;
	inicio=q->proximo;
	free(q);
	
}

void insereFinal(int x){
	struct lista *aux, *q;
	q=inicio;
	if(q==NULL){
		insereInicio(x);
		return;
	}
	while(q->proximo!=NULL){
		q=q->proximo;
	}
	aux = (struct lista *) malloc(sizeof(struct lista));
	aux->info=x;
	aux->proximo=NULL;
	q->proximo=aux;
}

void removeFinal(){
	struct lista *p, *q;
	p=NULL;
	q=inicio;
	if(q==NULL){
		printf("\nA lista esta vazia");
		getch();
		return;
	}
	while(q->proximo!=NULL){
		p=q;
		q=q->proximo;
	}
	if(p==NULL){
	   inicio=NULL;	
	}
	else 
	{                     
	   p->proximo=NULL;	    
	}                      
	free(q);
}

void insereDepois(struct lista *p, int x){
	struct lista *aux;
	aux=(struct lista *) malloc(sizeof(struct lista));
	aux->info=x;
	aux->proximo=p->proximo;
	p->proximo=aux;
	
}

void removeDepois(struct lista *p){
	struct lista *aux;
	aux=p->proximo;
	p->proximo=aux->proximo;
	free(aux);
}
 
void insereOrdenado(int x) {
	struct lista *p, *q;
	p=inicio;
	if (p==NULL || x<p->info){   
		insereInicio(x);                         
		return;                  
	}
	q=p;
	while(q!=NULL && q->info<x){
		p=q;
		q=q->proximo;
		
	}
	if(q==NULL || q->info > x)
	   insereDepois(p,x);
	else
	   printf("\nElemento ja existe");
}

void removeOrdenado(int x){
	
	struct lista *p, *q;
	p=inicio;
	if(p==NULL){
		printf("\nLista vazia");
		getch();                  
		return;                  
	}                            
	if (x==p->info){
		removeInicio();
		return;
	}
	q=p;
	while(q!=NULL && q->info < x){
		p=q;
		q=q->proximo;
	}
	if (q!=NULL && q->info==x)
	   removeDepois(p);
	else
  {
		printf("\nElemento nao cadastrado");
		getch();
	
	}
	
	
}
   
void mostraLista(){
	struct lista *p;
	p=inicio;
	while(p!=NULL){
		printf("\nValor na lista: %d",p->info);
		p=p->proximo;
	}
}
