# schain-wallet
git clone the code and replace 'CHAINCODE_ID' & 'APIKEY' at wallet.js

```ruby
Usage: wallet.js USERNAME
```

switch the USERNAME to load identity keystore for use wallet,
you can change any username to use wallet even if keystore file not exists.
after enter wallet you will see an interface like

```
node wallet.js test
Welcome to "test" wallet
        [0] register new user
        [1] show balance
        [2] transfer
        [3] approve (authorise someone transfer token from your account)
        [4] allowance (query approved tokens by the owner)
        [5] transferFrom (withdraw token from authorise account)
        [99] exit
         =>         
```
if you want to register new user, enter [0] and input new username
after register success you will get response like this


```ruby

{
  "result": {
    "user": "abcabcabcabcabcabcabc",
    "public_key": "-----BEGIN PUBLIC KEY-----\r\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoq98t28hKYiafUZLMtkVry/0H0Xf\r\nYBQ0B/WeXdgZp6tPzeL2fqhZ+cuxCLpsagcm9Bm3unl24VgrzuGQHPwfJg==\r\n-----END PUBLIC KEY-----\r\n",
    "private_key": "-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgOCJ415hIHHYsBE12\r\nBf2e/vB96Fr6IFM+vKoTX054IdihRANCAASir3y3byEpiJp9Rksy2RWvL/QfRd9g\r\nFDQH9Z5d2Bmnq0/N4vZ+qFn5y7EIumxqByb0Gbe6eXbhWCvO4ZAc/B8m\r\n-----END PRIVATE KEY-----\r\n"
  }
}


```

sdk will auto save keystore file to ./keystore folder then you can restart wallet with new identity

Note:
1. you will get chaincode id after upload chaincode to develop console

