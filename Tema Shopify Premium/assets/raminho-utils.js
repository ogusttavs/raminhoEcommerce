window.RaminhoUtils = window.RaminhoUtils || {};
window.RaminhoUtils.getSmartQuantityText = function(titleText, quantity) {
  let title = (titleText || "").toLowerCase();

  let gMatch = title.match(/(\d+)\s*g/);
  if (gMatch && !title.includes("kg")) {
    let baseGrams = parseInt(gMatch[1], 10);
    let totalGrams = baseGrams * quantity;
    if (totalGrams >= 1000) {
      let kg = totalGrams / 1000;
      let p = kg.toString().replace(".", ",");
      return (p.endsWith(",0") ? p.split(",")[0] : p) + "kg";
    }
    return totalGrams + "g";
  }

  let kgMatch = title.match(/([\d.,]+)\s*kg/);
  if (kgMatch) {
    let baseKg = parseFloat(kgMatch[1].replace(",", "."));
    let totalKg = baseKg * quantity;
    let p = totalKg.toString().replace(".", ",");
    return (p.endsWith(",0") ? p.split(",")[0] : p) + "kg";
  }

  return quantity + " un";
};

