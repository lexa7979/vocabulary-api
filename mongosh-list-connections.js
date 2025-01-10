/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// @ts-ignore
const result = db.currentOp(true).inprog.reduce(
    (accumulator, connection) => {
        // @ts-ignore
        ipaddress = connection.client ? connection.client.split(':')[0] : 'unknown';
        // @ts-ignore
        accumulator[ipaddress] = (accumulator[ipaddress] || 0) + 1;
        accumulator.TOTAL_CONNECTION_COUNT++;
        return accumulator;
    },
    { TOTAL_CONNECTION_COUNT: 0 }
);
// @ts-ignore
printjson(result);
