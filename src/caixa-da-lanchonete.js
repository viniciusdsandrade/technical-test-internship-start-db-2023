/*
    Olá! Você foi contratado para automatizar o caixa da Lanchonete da DB. 
    Sua missão será construir a lógica que calcula o valor de uma compra de acordo com o cardápio, 
    regras e descontos da Lanchonete.
*/

/* 
    * CARDÁPIO
    codigo	    descrição	                    valor
    cafe	    Café	                        R$ 3,00
    chantily	Chantily (extra do Café)	    R$ 1,50
    suco	    Suco Natural	                R$ 6,20
    sanduiche	Sanduíche	                    R$ 6,50
    queijo	    Queijo (extra do Sanduíche)     R$ 2,00
    salgado	    Salgado	                        R$ 7,25
    combo1	    1 Suco e 1 Sanduíche	        R$ 9,50
    combo2	    1 Café e 1 Sanduíche	        R$ 7,50
*/


/*
    FORMAS DE PAGAMENTO
    Atualmente a Lanchonete aceita as seguintes formas de pagamento:
    1 - dinheiro
    2 - debito
    3 - credito
    O sistema deve receber essa informação como string, utilizando a grafia exatamente igual aos exemplos acima.

    DESCONTOS E TAXAS
    1 - Pagamento em dinheiro tem 5% de desconto
    2 - Pagamento a crédito tem acréscimo de 3% no valor total
    
    OUTRAS REGRAS
    1 - Caso item extra seja informado num pedido que não tenha o respectivo item principal, apresentar mensagem 
    "Item extra não pode ser pedido sem o principal".
    2 - Combos não são considerados como item principal.
    3 - É possível pedir mais de um item extra sem precisar de mais de um principal.
    4 - Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"
    5 - Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".
    6 - Se o código do item não existir, apresentar mensagem "Item inválido!"
    7 - Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"
*/

class MenuItem {
    constructor(codigo, descricao, valor) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
    }
}

class CaixaDaLanchonete {
    constructor() {
        this.menu = {
            cafe: new MenuItem('cafe', 'Café', 3.00),
            chantily: new MenuItem('chantily', 'Chantily (extra do Café)', 1.50),
            suco: new MenuItem('suco', 'Suco Natural', 6.20),
            sanduiche: new MenuItem('sanduiche', 'Sanduíche', 6.50),
            queijo: new MenuItem('queijo', 'Queijo (extra do Sanduíche)', 2.00),
            salgado: new MenuItem('salgado', 'Salgado', 7.25),
            combo1: new MenuItem('combo1', '1 Suco e 1 Sanduíche', 9.50),
            combo2: new MenuItem('combo2', '1 Café e 1 Sanduíche', 7.50)
        };

        this.FORMAS_DE_PAGAMENTO = {
            dinheiro: 'dinheiro',
            debito: 'debito',
            credito: 'credito'
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
        
        let total = 0;
        let cafePedido = false;

        for (const itemString of itens) {
            const [itemCodigo, quantidade] = itemString.split(',');
            const item = this.menu[itemCodigo];

            if (!item) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (itemCodigo === 'cafe') {
                cafePedido = true;
            }
            
            total += item.valor * quantidade;
        }

        if (!cafePedido) {
            return 'Item extra não pode ser pedido sem o principal';
        }


        if (!this.FORMAS_DE_PAGAMENTO[metodoDePagamento]) {
            return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }
        
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export {CaixaDaLanchonete, MenuItem};
