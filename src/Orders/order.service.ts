import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dtos/order.dto';
import { OrderInterface } from './Interfaces/Order.interface';
import { ItemOrderInterface } from './Interfaces/ItemOrder.interface';

@Injectable()
export class OrderService{

    orders: OrderInterface[] = [
        {   
            id: 1, name: 'compra de cadeira', totalValue: 110, 
            itemsOrder: [{id: 1, name: 'cadeira', price: 100, priceTax: 110, type: 'produto', idOrder: 1}],
        }
    ];

    //método que retorna a lista de pedidos
    getOrders(): OrderInterface[]{
        return this.orders;
    }

    //método que retorna o pedido pelo ID passado como parâmetro
    getOrderById(id: number): OrderInterface | string{
        const order = this.orders.find(order => order.id === id);//verifico se tem algum pedido com esse ID passado como parâmetro na lista de pedidos
        if(order){
            return order;
        }else {
            return `Não existe no banco de dados um pedido com o ID: ${id}`;
        }
        
    }

    //método que cria um novo pedido
    createOrder(order: OrderDto): OrderInterface | string{
        
        let verification = false;//variável criada para receber o retorno de um boolean através do método verificationType()
        let type = '';//váriavel que irá armazenar o tipo do objeto caso ele não seja válido
        let idItem: number;
        if(order.itemsOrder && order.itemsOrder.length > 0){//verifico se o array de itens do pedido não está vazio e nem com o valor Null
            order.itemsOrder.map(item =>{
                 verification = this.verificationType(item.type);//método que verifica se o tipo do item do pedido é válido
                 if(verification === false){//caso não seja
                    type = item.type;//armazenar o tipo inválido para que ele seja exibido para o usuário
                    idItem = item.id;//armezana o ID do item que tem o tipo inválido
                 }
            });

            if(verification !== false){//só cria um novo pedido se todos os tipos dos itens do pedido passar na verificação
                this.orders.push(order);//adiciono o pedido a lista de pedidos
                this.calculateNewOrderValue(order);//chamo o método que atualiza o valor final do pedido, aplicando a taxa de imposto
                return order;
            } 
            else if(type !== ''){//se o tipo é invalido a variável type será preenchida e não estará vazia
                return `O tipo: '${type}' do item: ${idItem}, não é válido.`;// então retorno a mensagem exibindo para o usuário qual é tipo que está errado
            }
        } else {
            return 'O pedido não contém itens';//Se o array de itens do pedido está vazio ou com o valor Null, retorno essa mensagem
        } 
    }

    //método que adiciona um item a um pedido, através do ID do pedido que é passado como parâmetro (idOrder)
    createItemOrder(itemOrder: ItemOrderInterface, idOrder: number): OrderInterface | string{

        //variável criada para receber o retorno de um boolean através do método verificationType()
        const verification = this.verificationType(itemOrder.type);
        let orderAtt: OrderInterface;
        if(verification){
            this.orders.map((order) => {
                if(order.id === idOrder){
                    order.itemsOrder.push(itemOrder);//adiciono o novo item, a lista de itens do pedido
                    this.calculateNewOrderValue(order);//chamo o método que atualiza os valores do pedido
                    orderAtt= order;
                }
            });
            return orderAtt;
        }else {//se o tipo do pedido é inválido ou o ID do pedido não foi encontrado
            return `Por favor, verifique se o tipo: ${itemOrder.type} e o ID: ${idOrder} do pedido estão corretos`;
        }
    
    }

    //método que atualiza o pedido
    updateOrder(orderUpdate: OrderDto): OrderInterface | string{
        //variável que recebera um index para verificação
        const indexOrder = this.orders.findIndex(order => order.id === orderUpdate.id);//Chama o metódo que verifica se existe um objeto com esse ID na lista de pedidos e retorna um index
        let verification = false;
        orderUpdate.itemsOrder.map((item) => {
            verification = this.verificationType(item.type);//verifico se o tipo de todos os itens do pedido são válidos
        });
        
        //se o index retornado for negativo, é porque não existe um objeto com o ID do pedido passado como parâmetro
        if(indexOrder !== -1 && verification){//Verifica o valor do index e se os tipos dos itens dos objetos são válidos
            this.orders[indexOrder] = orderUpdate;
            this.calculateNewOrderValue(this.orders[indexOrder]);
            return this.orders[indexOrder];
        }else {
            return 'Não foi possível atualizar o pedido. Verifique o ID do pedido e o tipo de cada item do pedido';
        }
    }

    //método que exclui um pedido pelo ID
    deleteOrder(id: number): string {
        const index = this.orders.findIndex(order => order.id === id);//caso não exista um pedido com esse ID, o valor retornado será -1
        if(index !== -1) {
            this.orders = this.orders.filter(order => order.id !== id);//retiro o pedido da lista
            return 'Pedido deletado com sucesso';
        } else {
            return `Não existe um pedido com esse ID: ${id} em nosso banco de Dados`;
        }
       
    }

    //método usado para atualizar os valores de um novo pedido
    calculateNewOrderValue(order: OrderInterface){
        if(order.itemsOrder.length > 0){
            //percorro o array de itens do pedido, atualizando os valores dos impostos sobre cada um dos itens
            order.itemsOrder.map(item => {
                this.applyTax(item);//chamo o método que aplica a taxa no item do pedido
            });
            this.calculateFinalValue(order.id);//atualizo o valor final daquele pedido depois de aplicar as taxas
        } 
    }

    //método criado para aplicar o valor do imposto ao novo item adicionado ao pedido
    applyTax(itemOrder: ItemOrderInterface): boolean{
        itemOrder.priceTax = 0;
        if(itemOrder.type === 'produto'){
           itemOrder.priceTax = itemOrder.price * 1.1;//adicionando 10% de imposto sobre o produto
        }else if(itemOrder.type === 'serviço'){
            itemOrder.priceTax = itemOrder.price * 1.075;//adicionando 7,5% de imposto sobre o serviço
        }else if(itemOrder.type === 'locação'){
            itemOrder.priceTax = itemOrder.price * 1.05;//adicionando 5% de imposto sobre o serviço
        }else {
            return false;//se o tipo não for igual a nenhum dos 3 que são aceitos, retorno false
        }

        itemOrder.priceTax = Number(itemOrder.priceTax.toFixed(2));//transaformando o resultando da multiplicação para um valor com 2 casas decimais
        return true;//retorno true se a variável "type" for um tipo válido
    }

    //método criado apenas para atualizar o valor final de um pedido
    calculateFinalValue(id: number): void{
        //percorro a lista de pedidos
        this.orders.map((order) => {
            if(order.id === id){//ao encontrar o pedido
                order.totalValue = 0;//zero o valor final
                order.itemsOrder.map((item) => {
                    order.totalValue+= item.priceTax;//atualizo o valor final do pedido
                })
            }
        });
    }

    //método criado para verificar o tipo do item
    verificationType(type: string): boolean{
        if(type === 'produto' || type ===  'serviço' || type === 'locação'){//se o tipo for válido retorno true
            return true;
        }else {
            return false;
        }
    }

}