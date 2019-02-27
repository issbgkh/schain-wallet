# schain-wallet
Clone this repository and modify CHAINCODE_ID and APIKEY in wallet.js.

The CHAINCODE_ID can be found on the developer console after uploading your chaincode, while the APIKEY can be found on the profile page.

```ruby
Usage: node wallet.js USERNAME
```

Specify USERNAME so the wallet could load the proper user identity.
You can specify any username even if the user is not registered yet.

While entering the wallet, it prompts messages as below

```
node wallet.js user1
Welcome to "user1" wallet
        [0] register new user
        [1] show balance
        [2] transfer
        [3] approve (authorise someone transfer token from your account)
        [4] allowance (query approved tokens by the owner)
        [5] transferFrom (withdraw token from authorise account)
        [99] exit
         =>         
```
To register new user, type [0] followed by the desired username.
Once done, the user identity file is generated and stored in ./keystore directory.

```ruby

{
  "result": {
    "user": "user1",
    "public_key": "-----BEGIN PUBLIC KEY-----\r\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoq98t28hKYiafUZLMtkVry/0H0Xf\r\nYBQ0B/WeXdgZp6tPzeL2fqhZ+cuxCLpsagcm9Bm3unl24VgrzuGQHPwfJg==\r\n-----END PUBLIC KEY-----\r\n",
    "private_key": "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgOCJ415hIHHYsBE12\r\nBf2e/vB96Fr6IFM+vKoTX054IdihRANCAASir3y3byEpiJp9Rksy2RWvL/QfRd9g\r\nFDQH9Z5d2Bmnq0/N4vZ+qFn5y7EIumxqByb0Gbe6eXbhWCvO4ZAc/B8m\r\n-----END PRIVATE KEY-----\r\n"
  }
}


```
Now, you can start using the other wallet functionalities, including show balance, transfer, approve, and allowance coins.

