const supabase = require('../../../supabase.config');

const addLocation = async (app) => {
  app.post('/add_location', async (req, res) => {
    const {
      Province,
      name: location_name,
      latitude,
      longitude,
    } = req.body;

    console.log({
      Province,
      name: location_name,
      latitude,
      longitude,
    } )
    if (!Province || !location_name || !latitude || !longitude) {
      return res.status(400).json({
        message: 'Province, location name, latitude, and longitude are required ❌',
      });
    }

    const newLocation = {
      location_name,
      latitude,
      longitude,
    };

    // 1. Check if province exists
    const { data: provinceEntry, error: fetchError } = await supabase
      .from('locations')
      .select('*')
      .eq('province', Province)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return res.status(500).json({ message: fetchError.message || 'Failed to fetch province ❌' });
    }

    console.log({ provinceEntry })

    if (provinceEntry) {
      // 2. Check if location_name already exists
      const exists = provinceEntry.location_info?.some(
        (loc) => loc.location_name.toLowerCase() === location_name.toLowerCase()
      );

      console.log({ exists })

      if (exists) {
        return res.status(409).json({ message: 'Location already exists in this province ❌' });
      }

      // 3. Add new location to the list
      const updatedLocationInfo = [...provinceEntry.location_info, newLocation];

      const { error: updateError } = await supabase
        .from('locations')
        .update({ location_info: updatedLocationInfo })
        .eq('id', provinceEntry.id);

      if (updateError) {
        return res.status(500).json({ message: updateError.message || 'Failed to update location ❌' });
      }

      return res.status(200).json({ message: 'Location added successfully ✅' });
    } else {
      // 4. Create new province entry
      const { error: insertError } = await supabase.from('locations').insert([
        {
          province: Province,
          location_info: [newLocation],
        },
      ]);

      if (insertError) {
        return res.status(500).json({ message: insertError.message || 'Failed to insert province ❌' });
      }

      return res.status(200).json({ message: 'Province and location created successfully ✅' });
    }
  });
};

module.exports = { addLocation };
