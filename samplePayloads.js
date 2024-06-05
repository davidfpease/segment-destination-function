const settings = {
  "driftAuth": "update_with_your_drift_auth_token",
  "maxDriftRecords": 5
}

const identifyWithEmail = {
  "context": {
    "integrations": {
      "personas": false
    },
    "library": {
      "name": "unknown",
      "version": "unknown"
    },
    "personas": {
      "computation_class": "audience",
      "computation_id": "aud_2djnfxHHnYGVQfOAEBroQ9Ti87N",
      "computation_key": "eg_lcm_user_portal_roles_partial_access",
      "namespace": "spa_o1E9fAxCkCzjp6rLG1ptWR",
      "space_id": "spa_o1E9fAxCkCzjp6rLG1ptWR"
    }
  },
  "integrations": {
    "All": false,
    "HubSpot": true,
    "Warehouses": {
      "all": false
    }
  },
  "messageId": "personas_2fyFNSKX4MjAbsNJF5ZnNzCq0OV",
  "originalTimestamp": "2024-05-03T19:42:50.066179717Z",
  "receivedAt": "2024-05-03T19:42:59.762Z",
  "sentAt": null,
  "timestamp": "2024-05-03T19:42:50.066Z",
  "traits": {
    "eg_lcm_user_portal_roles_partial_access": true,
    "email": "dpease+test@drift.com"
  },
  "type": "identify",
  "userId": "<USER ID>",
  "writeKey": "REDACTED"
}

const identifyWithEmailAndAnonymousId = {
  "anonymousId": "hhamed",  //from orgId 5000883
  "context": {
    "integrations": {
      "personas": false
    },
    "library": {
      "name": "unknown",
      "version": "unknown"
    },
    "personas": {
      "computation_class": "audience",
      "computation_id": "aud_2djnfxHHnYGVQfOAEBroQ9Ti87N",
      "computation_key": "eg_lcm_user_portal_roles_partial_access",
      "namespace": "spa_o1E9fAxCkCzjp6rLG1ptWR",
      "space_id": "spa_o1E9fAxCkCzjp6rLG1ptWR"
    }
  },
  "integrations": {
    "All": false,
    "HubSpot": true,
    "Warehouses": {
      "all": false
    }
  },
  "messageId": "personas_2fyFNSKX4MjAbsNJF5ZnNzCq0OV",
  "originalTimestamp": "2024-05-03T19:42:50.066179717Z",
  "receivedAt": "2024-05-03T19:42:59.762Z",
  "sentAt": null,
  "timestamp": "2024-05-03T19:42:50.066Z",
  "traits": {
    "eg_lcm_user_portal_roles_partial_access": true,
    "email": "dpease+test@drift.com"
  },
  "type": "identify",
  "userId": "<USER ID>",
  "writeKey": "REDACTED"
}

const identifyNoEmail = {
  "anonymousId": "hhamed",  //from orgId 5000883
  "context": {
    "integrations": {
      "personas": false
    },
    "library": {
      "name": "unknown",
      "version": "unknown"
    },
    "personas": {
      "computation_class": "audience",
      "computation_id": "aud_2djnfxHHnYGVQfOAEBroQ9Ti87N",
      "computation_key": "eg_lcm_user_portal_roles_partial_access",
      "namespace": "spa_o1E9fAxCkCzjp6rLG1ptWR",
      "space_id": "spa_o1E9fAxCkCzjp6rLG1ptWR"
    }
  },
  "integrations": {},
  "messageId": "node-next-1717587880184-56f85841-64af-4a1f-890b-87c21c4f74f8",
  "originalTimestamp": "2024-06-05T11:44:40.184Z",
  "receivedAt": "2024-06-05T11:44:40.452Z",
  "sentAt": "2024-06-05T11:44:40.203Z",
  "timestamp": "2024-06-05T11:44:40.433Z",
  "traits": {
    "chelsey_test": true,
    "contactId": "hhamed"
  },
  "type": "identify",
  "writeKey": "REDACTED"
}

module.exports = {
  identifyNoEmail,
  identifyWithEmail,
  settings,
  identifyWithEmailAndAnonymousId
}