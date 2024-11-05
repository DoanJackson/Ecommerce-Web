import axios from "axios";
async function getTown(req, res) {
  try {
    const dataPlain = await axios.get("https://vapi.vnappmob.com/api/province");
    const result = { success: true, ...dataPlain.data };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

async function getDistrict(req, res) {
  try {
    const idProvince = req.body.id;
    const dataPlain = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${idProvince}`
    );
    const result = { success: true, ...dataPlain.data };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

export { getTown, getDistrict };
