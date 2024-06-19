//const HOST = '187.190.62.113/TCN_WEB/TNC'
//const HOST = '192.168.1.123:50/TNC'
var HOST_PRINCIPAL = '74.208.124.142:50'
var HOST_RESPALDO = '187.190.62.113/TCN_WEB'
var VersionSys = 'v2.1.9 Mazapán'

var API_URL_GRAL = `http://${HOST_PRINCIPAL}/TNC`;

var URL_PRINCIPAL = `http://${HOST_PRINCIPAL}/TNC`;
var URL_RESPALDO = `http://${HOST_RESPALDO}/TNC`;

var InServerPrincipal = 1

const DireccionPrincipal = () => {
    API_URL_GRAL = `http://${HOST_PRINCIPAL}/TNC/`;
    InServerPrincipal = 1
}

const DireccionRespaldo = () => {
    API_URL_GRAL = `http://${HOST_RESPALDO}/TNC/`;
}

export {API_URL_GRAL, URL_PRINCIPAL, URL_RESPALDO, VersionSys, DireccionRespaldo, DireccionPrincipal}