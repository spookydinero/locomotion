import QRCode from 'qrcode'

export interface VehicleQRData {
  id: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  license_plate?: string;
  customer_name?: string;
  entity_id: string;
  timestamp: string;
}

/**
 * Generate QR code data for a vehicle
 */
export function generateVehicleQRData(vehicle: {
  id: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  license_plate?: string;
  customer_name?: string;
  entity_id: string;
}): VehicleQRData {
  return {
    id: vehicle.id,
    vin: vehicle.vin,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    license_plate: vehicle.license_plate,
    customer_name: vehicle.customer_name,
    entity_id: vehicle.entity_id,
    timestamp: new Date().toISOString()
  };
}

/**
 * Generate QR code string from vehicle data
 */
export function generateVehicleQRString(vehicleData: VehicleQRData): string {
  // Create a compact JSON string for the QR code
  const qrData = {
    t: 'vehicle', // type
    id: vehicleData.id,
    v: vehicleData.vin,
    mk: vehicleData.make,
    md: vehicleData.model,
    y: vehicleData.year,
    lp: vehicleData.license_plate,
    cn: vehicleData.customer_name,
    e: vehicleData.entity_id,
    ts: vehicleData.timestamp
  };

  return JSON.stringify(qrData);
}

/**
 * Generate QR code as data URL (for display)
 */
export async function generateQRCodeDataURL(data: string): Promise<string> {
  try {
    const dataURL = await QRCode.toDataURL(data, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return dataURL;
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code as buffer (for storage)
 */
export async function generateQRCodeBuffer(data: string): Promise<Buffer> {
  try {
    const buffer = await QRCode.toBuffer(data, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return buffer;
  } catch (error) {
    console.error('Failed to generate QR code buffer:', error);
    throw new Error('Failed to generate QR code buffer');
  }
}

/**
 * Parse QR code data back to vehicle information
 */
export function parseVehicleQRData(qrString: string): VehicleQRData | null {
  try {
    const parsed = JSON.parse(qrString);
    if (parsed.t !== 'vehicle') {
      return null; // Not a vehicle QR code
    }

    return {
      id: parsed.id,
      vin: parsed.v,
      make: parsed.mk,
      model: parsed.md,
      year: parsed.y,
      license_plate: parsed.lp,
      customer_name: parsed.cn,
      entity_id: parsed.e,
      timestamp: parsed.ts
    };
  } catch (error) {
    console.error('Failed to parse QR code data:', error);
    return null;
  }
}

/**
 * Generate unique QR code identifier for a vehicle
 */
export function generateVehicleQRCode(vehicleId: string): string {
  // Create a unique code based on vehicle ID and timestamp
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `VQR-${vehicleId}-${timestamp}-${random}`.toUpperCase();
}