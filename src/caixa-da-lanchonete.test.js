import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test('deve retornar valor com duas casas decimais', () => {
        const caixa = new CaixaDaLanchonete();
        const valor = caixa.calcularValorDaCompra('dinheiro', ['cafe,2', 'sanduiche,1']);
        expect(valor).toMatch(/^\R\$\s\d+\,\d{2}$/);
    });
    
    test('deve retornar mensagem de erro para quantidade negativa', () => {
        const caixa = new CaixaDaLanchonete();
        const valor = caixa.calcularValorDaCompra('credito', ['cafe,-1']);
        expect(valor).toEqual('Quantidade inválida!');
    });

 
    test('deve retornar mensagem de erro para forma de pagamento inválida', () => {
        const caixa = new CaixaDaLanchonete();
        const valor = caixa.calcularValorDaCompra('paypal', ['cafe,1']);
        expect(valor).toEqual('Forma de pagamento inválida!');
    });

    test('deve lidar com pedidos de itens extra sem o item principal', () => {
        const caixa = new CaixaDaLanchonete();
        const valor = caixa.calcularValorDaCompra('credito', ['chantily,1', 'sanduiche,1']);
        expect(valor).toEqual('Item extra não pode ser pedido sem o principal');
    });

    test('deve aplicar desconto corretamente para pagamento em dinheiro', () => {
        const caixa = new CaixaDaLanchonete();
        const valor = caixa.calcularValorDaCompra('dinheiro', ['cafe,1', 'sanduiche,1']);
        expect(valor).toEqual('R$ 9,03');
    });
    
    test('deve lidar com casos extremos de quantidade', () => {
        const caixa = new CaixaDaLanchonete();
        const valor1 = caixa.calcularValorDaCompra('dinheiro', ['cafe,1000000']);
        const valor2 = caixa.calcularValorDaCompra('credito', ['cafe,0']);
        expect(valor1).toEqual('R$ 2850000,00');
        expect(valor2).toEqual('Quantidade inválida!');
    });
});