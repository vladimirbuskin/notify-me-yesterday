import axios from 'axios'
import checkPrev from '../src/checkPrevFile'

async function run() {


  var res = await axios({
    method: 'get',
    url: 'https://cgifederal.secure.force.com/scheduleappointment',
    headers: {
      //"Cookie": "BrowserId=f8u2-zktQwWRRv9SRG5odQ; __utmc=1; __utmz=1.1521049113.1.1.utmcsr=ustraveldocs.com|utmccn=(referral)|utmcmd=referral|utmcct=/ru/index.html; oinfo=c3RhdHVzPUFDVElWRSZ0eXBlPTYmb2lkPTAwREMwMDAwMDAwUGh1UA==; autocomplete=1; lloopch_loid=00DC0000000PhuP; lloopch_lpid=060C0000000QwL9; clientSrc=127.0.0.1; inst=APP_0h; oid=00DC0000000PhuP; apex__aa-time=Gq_2F2bDtSbCKdhYTR2ZGU7w_3D_3D; sid_Client=h00000EnlRh0000000PhuP; __utma=1.375132010.1521049113.1522311504.1522353834.5; __utmt=1; sid=00DC0000000PhuP!ARwAQG.jIyHE_7G4Z43qkpZo9j2nN_OgFeWXdLbfL2EsmtDFO..7PJkl4FYbQ06n4vAWSes6A6fhK2ZZZwFVYl47cRw2dL2u; __utmb=1.3.10.1522353834",
        "Cookie": "BrowserId=f8u2-zktQwWRRv9SRG4odQ; __utmc=1; __utmz=1.1521049113.1.1.utmcsr=ustraveldocs.com|utmccn=(referral)|utmcmd=referral|utmcct=/ru/index.html; oinfo=c3RhdHVzPUFDVElWRSZ0eXBlPTYmb2lkPTAwREMwMDAwMDAwUGh1UA==; autocomplete=1; lloopch_loid=00DC0000000PhuP; lloopch_lpid=060C0000000QwL7; clientSrc=127.0.0.1; inst=APP_0h; oid=00DC0000000PhuP; apex__aa-time=Gq_2F2bDtSbCKdhYTR2ZGU7w_3D_3D; sid_Client=h00000EnlRh0000000PhuP; __utma=1.375132010.1521049113.1522311504.1522353834.5; __utmt=1; sid=00DC0000000PhuP!ARwAQG.jIyHE_7G4Z43qkpZo9j2nN_OgFeWXdLbfL2EsmtDFO..7PJkl4FYbQ06n4vAWSes6A6fhK2ZZZwFVYl47cRw2dL2u; __utmb=1.3.10.1522353834",
      //"Content-Length": 1000,
      //"Referer": "https://cgifederal.secure.force.com/confirmreceip",
      //"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      //"Accept-Encoding": "gzip, deflate, br",
      //"Accept-Language": "en,en-US;q=0.9,ru-RU;q=0.8,ru;q=0.7,fr;q=0.6,bg;q=0.5"
    }
  });

  checkPrev('check.html', res.data);

}

run();