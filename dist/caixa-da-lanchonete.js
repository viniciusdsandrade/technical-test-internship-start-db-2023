"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = exports.CaixaDaLanchonete = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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
var MenuItem = /*#__PURE__*/_createClass(function MenuItem(codigo, descricao, valor) {
  _classCallCheck(this, MenuItem);
  this.codigo = codigo;
  this.descricao = descricao;
  this.valor = valor;
});
exports.MenuItem = MenuItem;
var CaixaDaLanchonete = /*#__PURE__*/function () {
  function CaixaDaLanchonete() {
    _classCallCheck(this, CaixaDaLanchonete);
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
  _createClass(CaixaDaLanchonete, [{
    key: "calcularValorDaCompra",
    value: function calcularValorDaCompra(metodoDePagamento, itens) {
      if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
      }
      var total = 0;
      var cafePedido = false;
      var _iterator = _createForOfIteratorHelper(itens),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var itemString = _step.value;
          var _itemString$split = itemString.split(','),
            _itemString$split2 = _slicedToArray(_itemString$split, 2),
            itemCodigo = _itemString$split2[0],
            quantidade = _itemString$split2[1];
          var item = this.menu[itemCodigo];
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
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
      return "R$ ".concat(total.toFixed(2).replace('.', ','));
    }
  }]);
  return CaixaDaLanchonete;
}();
exports.CaixaDaLanchonete = CaixaDaLanchonete;