public class TestaPessoa {
    
    public static void main(String[] args) {
        Pessoa p1 = new Pessoa("Carlos","10/05/1992");
        Pessoa p2 = new Pessoa("Ana","04/06/2002");
        PessoaImc pi1 = new PessoaImc("Paulo","10/02/1992",80,1.82);
        System.out.println("Objeto p1: " + p1);
        System.out.println("Objeto p2: " + p2);
        System.out.println("Objeto pi1: " + pi1);
        Homem h1 = new Homem("Joao","04/03/2003",82,1.75);
        System.out.println("Objeto h1: " + h1);
        System.out.println("Resultado: " + h1.resultadoImc());
        
    }
    
}