from flask import Flask,jsonify,request
from flask_cors import CORS
import json
import numpy as np
import string
import os
app = Flask(__name__)
CORS(app, origins="*")

startdata={
        "sources": {
            "money": 100
        },
        "chatserver": {},
        "chat": {},
        "freinds": {},
        "inboxs": [],
        "invites": []
    }
#base_dir = os.path.abspath(os.path.dirname(__file__))
base_dir = os.getcwd()
jsonusernameandpassword = os.path.join(base_dir, 'database', 'usernameandpassword.json')
jsonuserdata = os.path.join(base_dir, 'database', 'userdata.json')
jsonchatdatabase = os.path.join(base_dir, 'database', 'chatdatabase.json')
def checks(password:str):
    d=[]
    c=True
    if len(password)<8 or len(password)>20:
        d.append("password must be at least 8 characters")
        c=False
    if not any(char in "1234567890" for char in password):
        d.append("password must have number at least 1 character")
        c=False
    if not any(char.isupper() for char in password):
        d.append("password must uppercase 1 character")
        c=False
    if not any(char.islower() for char in password):
        d.append("password must lowercase 1 character")
        c=False
    if not any(char in "!@#$%^&*()-_=+[{]};:,<.>/?~`" for char in password):
        d.append("password must have special character at least 1 character")
        c=False
    return c,d
def checks1(username:str,usernameandpassword):
    d=[]
    if len(username.split(" ")) > 1:
        d.append("username have space")
    if username in usernameandpassword:
        d.append("already exit")
    return d
@app.route("/api/v1",methods=["GET", "POST"])
def indexd():
    if request.method == "POST":
        data = request.json
        username = data["username"]
        password = data["password"]
        with open(jsonuserdata, "r") as f:
            userdata = json.load(f)
        with open(jsonusernameandpassword, "r") as f:
            usernameandpassword = json.load(f)
        #canuse,why = checks(data["password"])
        canuse,why = True,[]
        if canuse and not username in usernameandpassword or len(username.split(" ")) > 1:
            usernameandpassword[username] = password
            userdata[username] = startdata
            with open(jsonuserdata, "w") as f:
                json.dump(userdata,f,indent=4)
            with open(jsonusernameandpassword, "w") as f:
                json.dump(usernameandpassword, f, indent=4)
            return jsonify({"message":"ok","data":userdata[username],"name":f"{username}"})
        else:
            why = checks1(username,usernameandpassword)
            return jsonify({"message": "error", "why": why})

    if request.method == "GET":
        return jsonify({"message": "Welcome to the API"})
@app.route("/api/v2",methods=["GET", "POST"])
def index1():
    if request.method == "POST":
        data = request.json
        username = data["username"]
        password = data["password"]
        with open(jsonusernameandpassword, "r") as f:
            usernameandpassword = json.load(f)
        with open(jsonuserdata,"r") as f:
            userdatas = json.load(f)
        if username in usernameandpassword and usernameandpassword[username] == password:

            return jsonify({"message":"ok","data":userdatas[username],"name":f"{username}"})
        else:
            return jsonify({"message": "error"})
@app.route("/api/v3",methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = request.json
        username = data["username"]
        myname = data["myname"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        with open(jsonusernameandpassword,"r") as f:
            usernameandpassword = json.load(f)
        if username in usernameandpassword and myname not in userdata[username]["inboxs"] and username not in userdata[myname]["invites"] and username != myname:
            userdata[username]["inboxs"].append(myname)
            userdata[myname]["invites"].append(username)
            print(userdata[myname]["invites"],userdata[username]["inboxs"])
            with open(jsonuserdata,"w") as f:
                json.dump(userdata,f,indent=4)
            return jsonify({"message":"Friend request sent successfully"}),200
        elif username in usernameandpassword and  myname in userdata[username]["inboxs"] and username in userdata[myname]["invites"]:
            return jsonify({"message":"You already","NO":"You already"}),200
        else:
            return jsonify({"message":"No user","NO":f"No user named {username}"}),200
@app.route("/api/v4",methods=["GET", "POST"])
def indexs():
    if request.method == "POST":
        data = request.json
        myname = data["myname"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        if myname in userdata:
            return jsonify({"inboxs":userdata[myname]["inboxs"], "m":"ok"}),200
@app.route('/api/v7', methods=['GET', 'POST'])
def apiv7():
    if request.method == 'POST':
        data = request.json
        myname = data["myname"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f) 
        return jsonify({"inboxs":userdata[myname]["inboxs"]}),200
@app.route('/api/v6', methods=['GET', 'POST'])
def apiv6():
    if request.method == 'POST':
        data = request.json
        myname = data["host"]
        inboxsname = data["inboxs"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        print(userdata[myname])
        try:
            userdata[myname]["inboxs"].remove(inboxsname)
            userdata[inboxsname]["invites"].remove(myname)
            userdata[myname]["invites"].remove(inboxsname)
            userdata[inboxsname]["inboxs"].remove(myname)
        except:
            pass
        with open(jsonuserdata,"w") as f:
            json.dump(userdata,f,indent=4)
        return jsonify({"as":"Da"}),200
    else:
        return jsonify({"as":"Da"}),400
@app.route('/api/v5', methods=['GET', 'POST'])
def apiv5():
    if request.method == 'POST':
        data = request.json
        myname = data["host"]
        inboxsname = data["inboxs"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        print(userdata[myname])
        try:
            userdata[myname]["freinds"].append(inboxsname)
            userdata[inboxsname]["freinds"].append(myname)
            userdata[myname]["inboxs"].remove(inboxsname)
            userdata[inboxsname]["invites"].remove(myname)
            userdata[myname]["invites"].remove(inboxsname)
            userdata[inboxsname]["inboxs"].remove(myname)
        except:
            pass
        with open(jsonuserdata,"w") as f:
            json.dump(userdata,f,indent=4)
        return jsonify({"as":"Da"}),200
    else:
        return jsonify({"as":"Da"}),400
##########################
@app.route('/api/v8', methods=['GET', 'POST'])
def apiv8():
    if request.method == "POST":
        data = request.json
        myname = data["myname"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        return jsonify({"myinvites":userdata[myname]["invites"]}),200
@app.route('/api/v9', methods=['GET', 'POST'])
def apiv9():
    if request.method == "POST":
        data = request.json
        myname = data["myname"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        return jsonify({"myfreinds":userdata[myname]["freinds"]}),200
##########################
@app.route("/api/v10",methods=["GET", "POST"])
def ipv10():
    if request.method == "POST":
        data = request.json
        myname = data["myname"]
        friendname = data["friendname"]
        with open(jsonuserdata,"r") as f:
            userdata = json.load(f)
        userdatamyname = userdata[myname]
        userdatafriendname = userdata[friendname]
        if friendname in userdatamyname["freinds"] and myname in userdatafriendname["freinds"] and friendname!=myname:
            chatme = userdata[myname]["chatlist"]
            chatmef = userdata[friendname]["chatlist"]
            while len(list(set(chatme) & set(chatmef))) < 1:
                #เปลี่ยนเป็นชื่อได้
                encode = ''.join(np.random.choice(list(string.ascii_letters), 10))
                chatme.append(f"{encode}")
                chatmef.append(f"{encode}")
                with open(jsonchatdatabase,"r") as f:
                    chatserver = json.load(f)
                chatserver.update({f"{encode}":{
                        "userinchat":[f"{myname}",f"{friendname}"],
                        "messageinchat":[]
                    }})
                with open(jsonchatdatabase,"w") as f:
                    json.dump(chatserver,f,indent=4)
            chatencode = list(set(chatme) & set(chatmef))
            if len(chatencode) >= 1:
                with open(jsonuserdata,"w") as f:
                    json.dump(userdata,f,indent=4)
                with open(jsonchatdatabase,"r") as f:
                    chatserver = json.load(f)
                chatdata = chatserver[chatencode[0]]
                if myname in chatdata["userinchat"] and friendname in chatdata["userinchat"]:
                    return jsonify({"chatid":chatencode[0],"friendname":f"{friendname}","myname":f"{myname}","chatdata":chatdata})
            else:
                print(3)
                return jsonify({"message":"Can't find chatroom"}),404
        else:
            print(2)
            return jsonify({"message":"Friend not found"}),404
    else:
        print(1)
        return jsonify({"message":"Method not allowed"}),405
@app.route("/api/v11",methods=["GET", "POST"])
def ipv11():
    if request.method == "POST":
        data = request.json
        chatid = data["chatid"]
        myname = data["myname"]
        message = data["message"]
        with open(jsonchatdatabase,"r") as f:
            chatserver = json.load(f)
        if chatid in chatserver:
            chatdata = chatserver[chatid]
            if myname in chatdata["userinchat"]:
                structure = {
                    "sender": myname,
                    "message": message,
                }
                chatdata["messageinchat"].append(structure)
                with open(jsonchatdatabase,"w") as f:
                    json.dump(chatserver,f,indent=4)
                return jsonify({"message":"Message sent successfully"}),200
    return jsonify({"As":"SAD"})
@app.route("/api/v12",methods=["GET", "POST"])
def ipv12():
    if request.method == "POST": 
        data = request.json
        chatid = data["chatid"]
        chats = data["chat"]
        with open(jsonchatdatabase,"r") as f:
            chatdata = json.load(f)
        chat = chatdata[chatid]["messageinchat"]
        if len(chats) != len(chat):

            return jsonify({"chat":chat})
        return jsonify({"OK":"OK"})
@app.route("/")  # Root route
def home():
    return "Flask App is Running!", 200

if __name__ == "__main__":
    app.run(debug=True)