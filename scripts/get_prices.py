from brownie import config, network, interface
from scripts.helper_scripts import get_account, toWei, fromWei, approve_erc20, FORKED_BLOCHCHAINS
from scripts.get_weth import get_weth
import brownie, requests



weth_token = config["networks"][network.show_active()]["weth-token"]
dai_token = config["networks"][network.show_active()]["dai-token"]


uni_router_address = config["networks"][network.show_active()]["uniswap-router"]
shiba_router_address = config["networks"][network.show_active()]["shibaswap-router"]
sushi_router_address = config["networks"][network.show_active()]["sushiswap-rou


def main():
    amount = toWei(1)

    uniswap_router = interface.IUniswapV2Router02(uni_router_address)
    sushiswap_router = interface.IUniswapV2Router02(sushi_router_address)
    shibaswap_router = interface.IUniswapV2Router02(shiba_router_address)
    
    path = [weth_token, usdt_token]

    amount_uniswap= uniswap_router.getAmountsOut(amount, path)[1]
    amount_sushiswap = sushiswap_router.getAmountsOut(amount, path)[1]
    amount_shibaswap = shibaswap_router.getAmountsOut(amount, path)[1]

    print("amount in uniswap: " , float(amount_uniswap) / 10**18)
    print("amount in sushiswap: " , float(amount_sushiswap)/ 10**18)
    print("amount in shibaswap: " , float(amount_shibaswap)/ 10**18)

    
