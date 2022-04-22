import json, yaml, os, shutil

# functions to copy smart contract data to the front end

def copy_build_folder():
    copy2frontend("./build", "./front-end/src/artifacts")
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front-end/src/utils/brownie-config.json", 'w') as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    
    print("front end updated !!!")

def copy2frontend(src, des):
    if os.path.exists(des):
        shutil.rmtree(des)
    shutil.copytree(src, des)


def main():
    copy_build_folder()