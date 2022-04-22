from brownie import config, network, interface
from scripts.helper_scripts import get_account, toWei, fromWei, approve_erc20, FORKED_BLOCHCHAINS
from scripts.get_weth import get_weth
import brownie, requests



weth_token = config["networks"][network.show_active()]["weth-token"]
dai_token = config["networks"][network.show_active()]["dai-token"]


"""
usdt_token = config["networks"][network.show_active()]["usdt-token"]

uni_router_address = config["networks"][network.show_active()]["uniswap-router"]

shiba_router_address = config["networks"][network.show_active()]["shibaswap-router"]

sushi_router_address = config["networks"][network.show_active()]["sushiswap-router"]


kyber_factory_address = config["networks"][network.show_active()]["kyber-factory"]
kyber_router_address = config["networks"][network.show_active()]["kyber-router"]

defi_router_address = config["networks"][network.show_active()]["defiswap"]
"""

sushi_router_address = config["networks"][network.show_active()]["sushiswap-router"]
quick_router_address = config["networks"][network.show_active()]["quickswap-router"]
jet_router_address = config["networks"][network.show_active()]["jetswap-router"]

 

def main():
    amount = toWei(1)
    """
        
    synapse_swap = interface.ISwap(synapse_address)
    weth_index = synapse_swap.getTokenIndex(weth_token)
    dai_index = synapse_swap.getTokenIndex(dai_token)
    amount_synapse = synapse_swap.calculateSwap(weth_index, dai_index, amount)
    
    print(dai_index, weth_index)

    kyber_factory = interface.IDMMFactory(kyber_router_address)
    kyber_router = interface.IDMMRouter02(kyber_router_address)


    pools = ["0xce9874c42dce7fffbe5e48b026ff1182733266cb"] 
    amount_kyber = kyber_router.getAmountsOut(amount, pools, [weth_token, usdt_token])[1]

    uniswap_router = interface.IUniswapV2Router02(uni_router_address)
    sushiswap_router = interface.IUniswapV2Router02(sushi_router_address)
    shibaswap_router = interface.IUniswapV2Router02(shiba_router_address)
    
    path = [weth_token, usdt_token]

    amount_uniswap= uniswap_router.getAmountsOut(amount, path)[1]
    amount_sushiswap = sushiswap_router.getAmountsOut(amount, path)[1]
    amount_shibaswap = shibaswap_router.getAmountsOut(amount, path)[1]

    print("amount in uniswap: " , float(amount_uniswap) / 10**6)
    print("amount in Kyber: " , float(amount_kyber)/ 10**6)
    print("amount in sushiswap: " , float(amount_sushiswap)/ 10**6)
    print("amount in shibaswap: " , float(amount_shibaswap)/ 10**6)
    

    """

    sushiswap_router = interface.IUniswapV2Router02(sushi_router_address)
    quickswap_router = interface.IUniswapV2Router02(quick_router_address)
    jetswap_router = interface.IUniswapV2Router02(jet_router_address)
    
    amount_sushiswap = sushiswap_router.getAmountsOut(amount, [weth_token, dai_token])[1]
    amount_quickswap = quickswap_router.getAmountsOut(amount, [weth_token, dai_token])[1]
    amount_jetswap = jetswap_router.getAmountsOut(amount, [weth_token, dai_token])[1]

    print("amount in sushiswap: " , float(fromWei(amount_sushiswap)))
    print("amount in quickswap: " , float(fromWei(amount_quickswap)))
    print("amount in jetswap: " , float(fromWei(amount_jetswap)))

    