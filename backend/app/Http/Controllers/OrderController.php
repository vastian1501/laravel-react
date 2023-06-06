<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new OrderCollection(Order::with('user')->with('productos')->where('status', 0)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = new Order();
        $order->user_id = Auth::user()->id;
        $order->total = $request->total;
        $order->save();
        
        //Obtener el id del pedido
        $id = $order->id;
        //Obtener los productos
        $products = $request->productos;

        //Formatear un arreglo
        $order_products = [];
        foreach($products as $product){
            $order_products[] = [
                'order_id'=>$id,
                'product_id'=>$product['id'],
                'cantidad'=>$product['cantidad'],
                'created_at'=> Carbon::now(),
                'updated_at'=> Carbon::now()
            ];
        }
        //Almacenar en la DB
        OrderProduct::insert($order_products);

        return [
            'message'=>'Recibido pedido nº:'. $order->id,
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->status = 1;
        $order->save();

        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
