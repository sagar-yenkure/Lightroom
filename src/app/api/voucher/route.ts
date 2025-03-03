import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Voucher from "@/models/voucher.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { name, code, amount, voucherNumber, isActive } = await req.json();

    if (!name || !code || !amount || !voucherNumber)
      return NextResponse.json(
        { error: "all fields are required" },
        { status: 500 }
      );
    await dbConnect();

    const voucherNameAlreadyExist = await Voucher.findOne({ code });
    if (voucherNameAlreadyExist)
      return NextResponse.json(
        { error: "voucher with this code already exist" },
        { status: 500 }
      );

    const voucher = await Voucher.create({
      name,
      code,
      amount,
      voucherNumber,
      isActive,
    });

    return NextResponse.json(
      { message: "voucher created", voucher },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    await dbConnect();
    const allVouchers = await Voucher.find().lean();
    if (!allVouchers)
      return NextResponse.json({ error: "no vouchers found" }, { status: 400 });

    return NextResponse.json(allVouchers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "voucher Id not found" },
        { status: 404 }
      );

    const deletedVoucher = await Voucher.findByIdAndDelete(id);
    if (!deletedVoucher)
      return NextResponse.json(
        { error: "voucher Id not found or not exist" },
        { status: 404 }
      );

    return NextResponse.json(deletedVoucher, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "voucher Id not found" },
        { status: 404 }
      );
    const body = await req.json();
    const updatedVoucher = await Voucher.findByIdAndUpdate(id, body);

    return NextResponse.json(updatedVoucher, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
