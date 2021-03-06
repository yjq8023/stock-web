export let th = `<tr>
          <th>股票代码</th>
          <th>股票名称</th>
          <th>单价</th>
          <th>涨幅</th>
          <th>成交量</th>
          <th>更新时间</th>
          <th>公式</th>
        </tr>`;

export let td = (val) => {
  return `<tr>
                    <td>${val.stock_code}</td>
                    <td>${val.stock_name}</td>
                    <td>${val.formula_time}</td>
                    <td class="${(val.num1.indexOf('-') !== (-1)) ? 'green' : 'red'}">${val.num1}</td>
                    <td>${val.num2}</td>
                    <td>${val.update_time}</td>
                    <td>${val.num3}</td>
                </tr>`
}

export let historyTh=`<tr>
          <th>股票代码</th>
          <th>股票名称</th>
          <th>选出时单价</th>
          <th>昨日收盘价</th>
          <th>累计涨幅</th>
          <th>更新时间</th>
          <th>公式</th>
        </tr>`;

export let historyTd = (val) => {

  return        `<tr>
                    <td>${val.stock_code}</td>
                    <td>${val.stock_name}</td>
                    <td>${val.formula_time}</td>
                    <td class="${(val.cumulative_increase.indexOf('-')!==(-1))?'green':'red'}">${(val.detail[3] * 1).toFixed(2)}</td>
                    <td class="${(val.cumulative_increase.indexOf('-')!==(-1))?'green':'red'}">${(val.cumulative_increase * 100).toFixed(2)} %</td>
                    <td>${val.update_time}</td>
                    <td>${val.num3}</td>
                </tr>`
}

