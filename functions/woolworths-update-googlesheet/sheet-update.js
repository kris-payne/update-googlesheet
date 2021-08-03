const { GoogleSpreadsheet } = require("google-spreadsheet");

var creds = {
    "type": "service_account",
    "project_id": "woolworths-sms",
    "private_key_id": "6a3bb1211442e01993ce2a303fbfc622d72252c4",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvugnvC2f1w2mS\nu+Xs0T2C4G6o5IrZyA02SN7IJZI4PW8sxWPHdm0g8ENknE6fncMCPUdoRS+5gynz\nswfnvNF1Sy/o66q+y5KHREYWHW/Iq7KCy91lMWBPq6+8WOrnZLG5YCCVvwpcPCbL\nAN1ZOfrlEVPAXJrUPOMFsoOy5qUb0cO5iSEr14tfhdbcmjDxDWCPeXmmK15MQL1F\n+Bc2imGLsCpdjJHIb6ncAdOZmzmxhb5y+NQKGJw9dbbdCH9ZiYGdAB0rNDETdcp2\nvrnI/tCGWM6UjQPryJaXRviGsAAGG+C0JeAsuF0B3uMDtg7gJBch+jT0gFtD1tUx\nuGSPBXGlAgMBAAECggEAE8VycViEMDegp5IdMtbxUnSz9AFldKQN2yoPFCUossve\nuAKBe84MReTNKwMXKYhTikCgyc+MU2q5i/d8ZTYZDwG6+JGYxXIcILytcgw1KTaA\nQDfLHM6VuoEOUGUPZkzYXjYS6dDzy8riG9G+FdhF2ANqET5EwVUUae4Fjq8QAUrE\nQL3pDLEhuu+Sl8Vjd69bGXbV7d0cyC93nfN2+w4jBS2u6WMRmplZMEjj5lf53TlX\ne1ejM4U1ZhSoq2DU3TyjWkWTRtr7fY27swAWd9nw6LLIvnUIrYYgX0e0jntvCG0R\ndlhGPau1DAwlVk9JoEdH3xyjRNPqYCP64d750mDQBQKBgQDuQDHedp8bwR4q2viG\noCfV9srRGSJC5ZTxLd7ZnbCS23wtmOjC2hO3/A0bpI5o/5A89pr/xODJaj30n8WJ\nFns41Sh2Cjrt27KDEaH4nzdhWKmDs8uxKIAPHqKomgoBb3CRpBWW2a4fheCjDHTM\n/QQPSVX6HHjRNjQ/Uqpo3Fc6JwKBgQC80WpFLNRo81aSfPlg0K1XF674Ag6yh8Wf\ncZNzalAW5xRhEP9QaBUmfEzxSron2phg+joqlfVOb0wH/5K8X3MJ/X75qXn2WEY9\nDucrDj6zDamAmgfL4vnoY+OnxDDHnIh0qOP0RE9K87HSZxhWpvNDHqCPRhdUNw2W\nAPe0brcRUwKBgBzV8DM4sDEvwnL1ZbcFk0y2Pf3oyNjH6Kr4HkzAZSqhHfp201Ui\nB9jwzLVXyVSz+cUnI8NpFLvL/AuresEI04khY3BF9LPtL0Hl1HC+9Hj3viyOiky6\n1iT+VDmLy0I5Nqqp7WMAna57CaEyVMCqrt8axSksYQMRSGmRm8ZtRLFpAoGARbSB\nqNvt5ni+4wFkBsvC0j4aB9CqoFnjKQOCzb7XpjzUlyjxODvUYwrMVN+jbYcTbemy\ng3osvzHzPZiqEQSjsXJ157EbJ0hbVbskuA5gMzW9943lhu1aGOKXbp3M7EPrVDXt\nQYXeR+tDIEuS/ppPf93UpE/Z2OsiBtiAmYmt56UCgYALKbK7pQPLVxe0K5PBz7EM\nSHMmvSPOrvHqV+9EElDVvjQ9hAs7FNpJS1KYQE0liBY7n3PkS1IBvquinRPGdYsG\nKVv3KgAYIw0gQBIHWm1Fc1JhnNtM1Lptbm6HpNCCowBySJkBOx/sr+0STEcmFMWb\nDJbHHtljU8jm28PxrIA/Tg==\n-----END PRIVATE KEY-----\n",
    "client_email": "wooliestest@woolworths-sms.iam.gserviceaccount.com",
    "client_id": "114761351501223788723",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/wooliestest%40woolworths-sms.iam.gserviceaccount.com"
  };

async function getCells(cellToUpdate) {
  const doc = new GoogleSpreadsheet('1dQmbE7eIc6UNJ4Pip27fXJ2dVa5-HGxQnWlkPy91Ge4');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet1 = doc.sheetsByIndex[0];

  await sheet1.loadCells(cellToUpdate);
  let cellAddress = sheet1.getCellByA1(cellToUpdate)
  console.log(cellAddress.value);
  cellAddress.value = 'This message is new';
  await sheet1.saveUpdatedCells();

  return cellAddress;
}

exports.handler = async function(context, event, callback) {
  
  let cellToUpdate = 'H4';
  const cell = await getCells(cellToUpdate);
  console.log(cell);

  callback(null, cell);
};