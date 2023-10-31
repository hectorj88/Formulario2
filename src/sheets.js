let pedidos;

async function getPedidos(){
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1zjjoOVeIl11Ytg5grWpP_Z4BxlEbjMJYwjNpLebGbSg',
            range: 'pedidos!A:BH',
        });
    } catch (err) {
        console.error(err)
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.warn("No se encontraron valores")
        return;
    }

    pedidos = [];
    console.log(range.values) /*borrar despues de pruebas*/
    range.values.foreach((fila) => {
        if (isNaN(parseInt(fila[0])) || fila[5] ==! undefined) return;
        const nuevoPedido ={
            pedido: fila[0],
            fecha: fila[1],
            cuenta: fila[2],
            nombre1: fila[3],
            apellido: fila[4],
            direccion: fila[5],
            telefono: fila[6],
            barrio: fila[7],
            empresa: fila[8],
            telefono2: fila[9],
            direccion2: fila[10],
            cargo: fila[11],
            antiguo: fila[12],
            sueldo: fila[13],
            email: fila[14],
            fCobro: fila[15],
            nnNino: fila[16],
            ciudad: fila[17],
            cNomb: fila[18],
            cApell: fila[19],
            cEmpresa: fila[20],
            cTele: fila[21],
            cDir: fila[22],
            cAntig: fila[22],
            cSueldo: fila[23],
            cmarca: fila[24],
            cModelo: fila[25],
            cPlaca: fila[26],
            rnomb1: fila[27],
            rp1: fila[28],
            rTele1: fila[29],
            rTeleres1: fila[30],
            rNomb2: fila[31],
            rp2: fila[32],
            rTele2: fila[33],
            rTeleres2: fila[34],
            rNomb3: fila[35],
            rp3: fila[36],
            rTele3: fila[34],
            rTeleres3: fila[35],
            rNomb4: fila[36],
            rp4: fila[37],
            rTele4: fila[38],
            rTeleres4: fila[39],
            oCuotas: fila[40],
            oValor: fila[41],
            cedula1: fila[42],
            cc1: fila[43],
            ce1: fila[44],
            relacionista: fila[45],
            colaborador: fila[46],
            director: fila[47],
            organizador: fila[48],
            rematador: fila[49],
            cedula2: fila[50],
            cc2: fila[51],
            ce2: fila[52],
            cedula3: fila[53],
            cedula4: fila[54]
        };
        pedidos.push(nuevoPedido);
    });

}