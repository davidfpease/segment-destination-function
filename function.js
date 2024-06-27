/**
 * Handle identify event
 * @param  {SegmentIdentifyEvent} event
 * @param  {FunctionSettings} settings
 */
async function onIdentify(event, settings) {
  // Learn more at https://segment.com/docs/connections/spec/identify/

  //determine if this is an audience event
  if (event.context?.personas?.computation_class != 'audience') {
    return;
  }

  // possible to find record by oktaUserId here and update that single record 'directly'?
  // let ajsAnonymousId = event.anonymousId;

  // if (ajsAnonymousId) {
  //   let driftContact = await getDriftContactByExternalId(ajsAnonymousId, settings);

  //   //update record if found
  //   if (driftContact.data.length > 0) {
  //     await updateDriftContact(event, settings, driftContact.data[0].id);
  //   }
  // }

  //check if an email is present
  let email = event?.traits?.email || event.email;

  if (email) {
    //get Drift Contacts by email
    let driftContacts = await getDriftContacts(settings, email);

    let driftContactsSorted = driftContacts.data.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    let promises = [];

    for (
      let index = 0;
      index < driftContactsSorted.length && index < settings.maxDriftRecords;
      index++
    ) {
      console.log(`Updating contact number ${index + 1}.`);

      //don't "re-update" the record that was just updated by externlId
      if (driftContactsSorted[index].attributes.externalId != ajsAnonymousId) {
        promises.push(
          updateDriftContact(event, settings, driftContactsSorted[index].id)
        );
      }
    }

    await Promise.allSettled(promises);
  }
}

async function updateDriftContact(event, settings, contactId) {
  let response;
  let retries = 5;
  let endpoint = `https://driftapi.com/contacts/${contactId}`;


  for (let i = 0; i < retries; i++) {
    try {
      console.log(
        `Updating Drift contact: ${contactId} with the following attributes: `,
        event.traits
      );
      response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${settings.driftAuth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "attributes": event.traits })
      });

      if (response.status === 200) {
        return JSON.parse(await response.text());
      } else if ((response.status >= 500 || response.status === 429) && i < retries - 1) {
        // Retry on 5xx (server errors) and 429s (rate limits) after 1 second delay
        console.log(`${response.status} error updating Drift contact by contactId ${contactId}, attempting retry.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw new Error(`Failed to update Drift contact by contactId ${contactId} with status code ${response.status}.`);
      }
    } catch (error) {
      console.log(`Error sending request to update Drift contact by contactId: ${contactId}`, error?.message);
      return
    }
  }
}

async function getDriftContactByExternalId(anonymousId, settings) {
  let response;
  let retries = 5;
  let endpoint = `https://driftapi.com/contacts?idType=external&id=${encodeURIComponent(
    anonymousId
  )}`;

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Retrieving Drift contact by externalId: ${endpoint}`);
      response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${settings.driftAuth}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        return JSON.parse(await response.text());
      } else if ((response.status >= 500 || response.status === 429) && i < retries - 1) {
        // Retry on 5xx (server errors) and 429s (rate limits) after 1 second delay
        console.log(`${response.status} error retrieving Drift contact by externalId ${anonymousId}, attempting retry.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw new Error(`Failed to retrieve Drift contact by externalId ${anonymousId} with status code ${response.status}.`);
      }
    } catch (error) {
      console.log(`Error sending request for Drift contact by externalId: ${anonymousId}`, error?.message);
      //if no record found or the request fails, return an empty payload 
      return {
        "data": []
      }
    }
  }
}

async function getDriftContacts(settings, email) {
  let response;
  let retries = 5;
  let endpoint = `https://driftapi.com/contacts?email=${encodeURIComponent(
    email
  )}&limit=100`;

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Retrieving drift contacts: ${endpoint}`);
      response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${settings.driftAuth}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        return JSON.parse(await response.text());
      } else if ((response.status >= 500 || response.status === 429) && i < retries - 1) {
        // Retry on 5xx (server errors) and 429s (rate limits) after 1 second delay
        console.log(`${response.status} error retrieving Drift contacts by email ${email}, attempting retry.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        throw new Error(`Failed to retrieve Drift contacts by email ${email} with status code ${response.status}.`);
      }
    } catch (error) {
      console.log(`Error sending request to retrieve Drift contacts by email: ${email}`, error?.message);
      return
    }
  }
}


//FOR DEV ONLY, REMOVE everything below before adding to Segment
const { identifyNoEmail, identifyWithEmailAndAnonymousId, identifyWithEmail, settings } = require('./samplePayloads');

onIdentify(identifyWithEmailAndAnonymousId, settings).then(res => {
  debugger;
});
