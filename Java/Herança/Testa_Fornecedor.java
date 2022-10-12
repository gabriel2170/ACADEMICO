public class TestaFornecedor {
    
    public static void main(String[] args) {
        Fornecedor forn1 = new Fornecedor("Fernando","Rua General Osorio, 1148",
        "16-39748258",234.50,1220.80);
        System.out.println("Nome: "  + forn1.getNome());
        System.out.println("Saldo: " + forn1.obterSaldo());
    }
    
}