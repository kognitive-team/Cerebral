import {CONNECT_INSTANCE_ID} from '../Config/AWSConfig'

export const CONNECT_INSTANCE_URL = "https://lonebridge.awsapps.com/connect/ccp-v2/"
export const AWS_REGION = "us-east-1"
export const CONNECT_USER_LIST_URL = `https://users-summary/${CONNECT_INSTANCE_URL}?maxResults=20`
export const CONNECT_QUEUE_LIST_URL = `https://connect.us-east-1.amazonaws.com/queues-summary/${CONNECT_INSTANCE_ID}?maxResults=20&queueTypes=AGENT`





