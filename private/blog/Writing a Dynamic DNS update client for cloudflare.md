# Writing a Dynamic DNS update client for cloudflare

Recently I switched from Google Domains over to Cloudflare for DNS, because Cloudflare offers a few really nice services for free to small site owners, such as proxied DNS which hides my origin IP, DDoS protection, and static page caching which reduces bandwidth my server must handle.

In order to finish migrating to Cloudflare, I had to configure Dynamic DNS to update my IP in the Cloudflare servers whenever my ISP changes my IP.  I had been using ddclient for Google Domains, but I couldn't get it, inadyn, or dns-o-matic to work with Cloudflare, so I decided to write my own basic Dynamic DNS updater.

### Components
Here is what I needed to update the record on the Cloudflare server

1. Find my current IP Address
2. Get an API key to authenticate
3. Find the zone and record ID to update
4. Make an authenticated POST request to the API endpoint to update my current IP in the Cloudflare DNS servers
5. Repeat as often as I want.

### Strategy
Finding my current IP was easy, I can just run `curl -s -X GET "https://myip.dnsomatic.com"`, with the `-s` flag, this returns a single string IP address, which can be stored into a variable.  I chose to do the rest in NodeJS because I am familiar with it, but it would have been very easy to do in python or bash as well.

To get the API key, I went to my profile on Cloudflare, and went to API and copied the origin API key into an object variable in `credentials.js`: `module.exports = { key: 'mykey' }`

The Zone ID can be found on the main page for my site at the bottom right under API -> Zone ID in Cloudflare, I will add this to my credentials file.  To find the dns record ID that I wanted to update, I went over to the [Cloudflare API](https://api.cloudflare.com) and used:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/:zone_identifier/dns_records" \
    -H "X-Auth-Email: myEmail@myDomain.com" \
    -H "X-Auth-Key: myKey" \
    -H "Content-Type: application/json"
``` 

parsing through the names in the returned data, I can find the ID of the correct record.  I can then add this to my credentials file for easy access later.  Finally I can do my update with a PUT request:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_identifier/dns_records/:identifier" \
    -H "X-Auth-Email: myEmail@myDomain.com" \
    -H "X-Auth-Key: myKey" \
    -H "Content-Type: application/json"
    --data '{"type":"A","name":"myDomain.com","content":"myIP","ttl":{},"proxied":true}'
```

This will update myDomain.com with the IP myIP, and it will be proxied through Cloudflare

### Putting this into Node

We first need to import a few things, the https package, child_process, and our credentials file.  We can also run a command to get our current IP:

```javascript
 var https = require('https');
 var cp = require('child_process');
 var credentials = require('./credentials.js');
 var IP = cp.execSync('curl -s -X GET "https://myip.dnsomatic.com"');
```

Where the credentials file currently holds: 

```javascript
module.exports = {
    username: "myEmail@myDomain.com",
    key: "myKey",
    zone: "zoneID",
    dns_record: "dnsRecordID"
}
```

Now that we have our credentials and current IP, we can start to build the request:

```javascript
const options = {
    host: 'api.cloudflare.com',
    port: '443'
    path: `/client/v4/zones/${credentials.zone}/dns_records/${credentials.dns_record}`,
    method: 'PUT',
    headers: {
        "X-Auth-Email":credentials.username,
        "X-Auth-Key":credentials.key,
        "Content-Type": "application/json",
    }
}
const req = https.request(options (res) => {
    res.on('data', (d) => {
        process.stdout.write(d);
    }
}
```

Now we have a request made with the correct headers to the correct api endpoint, and we just need to send the data to update the dns record:

```javascript
var data = {
    type: "A",
    name: "myDomain.com",
    content: IP.toString(),
    ttl: 3600,
    proxied: true
}
req.write(JSON.stringify(data))
req.end()
```

So now we've made updated the dns_record as a an "A" record (unchanged), domain as "myDomain.com" (unchanged), and IP (possibly changed).

Finally, I can add this to my crontab: `0 */1 * * * node update.js >> /var/log/dyn_dns_update.log`.  This will run the script every hour and write the standard output to a log.