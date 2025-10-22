import React from 'react';
import { LogSheetData, DutyStatus } from '@/types';


export default function ELDLogSheet({ logData }: { logData: LogSheetData }) {
    // Canvas dimensions matching standard log format
    const width = 1200;
    const height = 700;

    // Grid dimensions
    const gridLeft = 80;
    const gridTop = 180;
    const gridWidth = 1040;
    const gridHeight = 280;
    const rowHeight = gridHeight / 4;

    // Time calculations
    const hourWidth = gridWidth / 24;
    const quarterHourWidth = hourWidth / 4;

    const statusToRow: Record<DutyStatus, number> = {
        'off_duty': 0,
        'sleeper_berth': 1,
        'driving': 2,
        'on_duty': 3
    };

    const labels = ['1. Off Duty', '2. Sleeper', '3. Driving', '4. On Duty'];

    const timeToX = (timeString: string): number => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const decimalHours = hours + (minutes / 60);
        return gridLeft + (decimalHours * hourWidth);
    };

    const statusToY = (status: DutyStatus): number => {
        const rowIndex = statusToRow[status];
        return gridTop + (rowIndex * rowHeight) + (rowHeight / 2);
    };

    const generateDutyPath = (): string => {
        if (!logData.dutyStatusChanges || logData.dutyStatusChanges.length === 0) {
            return '';
        }

        let path = '';
        logData.dutyStatusChanges.forEach((change, index) => {
            const x = timeToX(change.time);
            const y = statusToY(change.status);

            if (index === 0) {
                path += `M ${x} ${y} `;
            } else {
                path += `L ${x} ${y} `;
            }

            if (index < logData.dutyStatusChanges.length - 1) {
                const nextX = timeToX(logData.dutyStatusChanges[index + 1].time);
                path += `L ${nextX} ${y} `;
            }
        });

        return path;
    };

    // Generate 15-minute marker lines
    const quarterLines = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let quarter = 1; quarter <= 3; quarter++) {
            quarterLines.push(
                <line
                    key={`v-quarter-${hour}-${quarter}`}
                    x1={gridLeft + (hour * hourWidth) + (quarter * quarterHourWidth)}
                    y1={gridTop}
                    x2={gridLeft + (hour * hourWidth) + (quarter * quarterHourWidth)}
                    y2={gridTop + gridHeight}
                    stroke="#d1d5db"
                    strokeWidth="0.5"
                />
            );
        }
    }

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                    Driver&apos;s Daily Log - Day {logData.day}
                </h3>
            </div>

            <div className="bg-white rounded-xl p-4 overflow-x-auto">
                <svg width={width} height={height}>
                    {/* Title */}
                    <text x={width / 2} y="25" fontSize="16" fontWeight="bold" fill="#000" textAnchor="middle">
                        Driver&apos;s Daily Log
                    </text>

                    {/* Header Information */}
                    <text x="20" y="55" fontSize="12" fill="#000">
                        Date: {logData.date}
                    </text>
                    <text x="20" y="75" fontSize="11" fill="#000">
                        From: ________________
                    </text>
                    <text x="250" y="75" fontSize="11" fill="#000">
                        To: ________________
                    </text>

                    <text x="600" y="55" fontSize="11" fill="#000">
                        Name of Carrier or Carriers: {logData.carrierName}
                    </text>
                    <text x="600" y="75" fontSize="11" fill="#000">
                        Main Office Address: ________________
                    </text>

                    {/* Driver and Vehicle Info */}
                    <text x="20" y="105" fontSize="11" fill="#000">
                        Total Miles Driving Today: {logData.totalMiles}
                    </text>
                    <text x="300" y="105" fontSize="11" fill="#000">
                        Total Mileage Today: ________
                    </text>

                    <text x="20" y="130" fontSize="11" fill="#000">
                        Truck/Tractor and Trailer Numbers or License Plate/State (Show each unit):
                    </text>
                    <text x="20" y="150" fontSize="11" fill="#000">
                        {logData.vehicleNumber}
                    </text>

                    <text x="600" y="130" fontSize="11" fill="#000">
                        Home Terminal Address:
                    </text>

                    {/* Grid section label */}
                    <text x="20" y={gridTop - 10} fontSize="11" fontWeight="bold" fill="#000">
                        GRID
                    </text>

                    {/* Main Grid Border */}
                    <rect
                        x={gridLeft}
                        y={gridTop}
                        width={gridWidth}
                        height={gridHeight}
                        fill="none"
                        stroke="#000"
                        strokeWidth="2"
                    />

                    {/* Horizontal lines (rows) */}
                    {[0, 1, 2, 3, 4].map(i => (
                        <line
                            key={`h-${i}`}
                            x1={gridLeft}
                            y1={gridTop + (i * rowHeight)}
                            x2={gridLeft + gridWidth}
                            y2={gridTop + (i * rowHeight)}
                            stroke="#000"
                            strokeWidth={i === 0 || i === 4 ? "2" : "1"}
                        />
                    ))}

                    {/* Vertical lines - hourly (bold) */}
                    {Array.from({ length: 25 }, (_, i) => (
                        <line
                            key={`v-hour-${i}`}
                            x1={gridLeft + (i * hourWidth)}
                            y1={gridTop}
                            x2={gridLeft + (i * hourWidth)}
                            y2={gridTop + gridHeight}
                            stroke="#000"
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* Vertical lines - 15-minute markers (thin) */}
                    {quarterLines}

                    {/* Midnight label at left start */}
                    <text
                        x={gridLeft}
                        y={gridTop - 5}
                        fontSize="9"
                        fill="#000"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        M
                    </text>

                    {/* Hour numbers at top */}
                    {Array.from({ length: 23 }, (_, i) => (
                        <text
                            key={`hour-top-${i}`}
                            x={gridLeft + ((i + 1) * hourWidth)}
                            y={gridTop - 5}
                            fontSize="9"
                            fill="#000"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {i + 1 === 12 ? 'Noon' : i + 1}
                        </text>
                    ))}

                    {/* Midnight label at right end */}
                    <text
                        x={gridLeft + gridWidth}
                        y={gridTop - 5}
                        fontSize="9"
                        fill="#000"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        M
                    </text>

                    {/* Midnight label at left bottom */}
                    <text
                        x={gridLeft}
                        y={gridTop + gridHeight + 12}
                        fontSize="9"
                        fill="#000"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        M
                    </text>

                    {/* Hour numbers at bottom */}
                    {Array.from({ length: 23 }, (_, i) => (
                        <text
                            key={`hour-bottom-${i}`}
                            x={gridLeft + ((i + 1) * hourWidth)}
                            y={gridTop + gridHeight + 12}
                            fontSize="9"
                            fill="#000"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {i + 1 === 12 ? 'Noon' : i + 1}
                        </text>
                    ))}

                    {/* Midnight label at right bottom */}
                    <text
                        x={gridLeft + gridWidth}
                        y={gridTop + gridHeight + 12}
                        fontSize="9"
                        fill="#000"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        M
                    </text>

                    {/* Noon markers removed - now integrated above */}

                    {/* Status labels on left */}
                    {labels.map((label, i) => (
                        <text
                            key={`label-${i}`}
                            x={gridLeft - 5}
                            y={gridTop + (i * rowHeight) + (rowHeight / 2)}
                            fontSize="10"
                            fill="#000"
                            textAnchor="end"
                            dominantBaseline="middle"
                        >
                            {label}
                        </text>
                    ))}

                    {/* Status labels on right */}
                    {labels.map((label, i) => (
                        <text
                            key={`label-right-${i}`}
                            x={gridLeft + gridWidth + 5}
                            y={gridTop + (i * rowHeight) + (rowHeight / 2)}
                            fontSize="10"
                            fill="#000"
                            dominantBaseline="middle"
                        >
                            {label}
                        </text>
                    ))}

                    {/* Draw duty status path */}
                    <path
                        d={generateDutyPath()}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Draw circles at each duty status change point */}
                    {logData.dutyStatusChanges.map((change, index) => (
                        <circle
                            key={`point-${index}`}
                            cx={timeToX(change.time)}
                            cy={statusToY(change.status)}
                            r="3"
                            fill="#2563eb"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* Remarks section */}
                    <text x="20" y={gridTop + gridHeight + 50} fontSize="12" fontWeight="bold" fill="#000">
                        Remarks:
                    </text>
                    <line
                        x1="20"
                        y1={gridTop + gridHeight + 55}
                        x2={width - 20}
                        y2={gridTop + gridHeight + 55}
                        stroke="#000"
                        strokeWidth="1"
                    />
                    {logData.remarks.map((remark, index) => (
                        <text
                            key={`remark-${index}`}
                            x="30"
                            y={gridTop + gridHeight + 75 + (index * 18)}
                            fontSize="10"
                            fill="#000"
                        >
                            • {remark}
                        </text>
                    ))}

                    {/* Totals section */}
                    <text x="20" y={gridTop + gridHeight + 150} fontSize="11" fontWeight="bold" fill="#000">
                        Total Hours:
                    </text>
                    <text x="120" y={gridTop + gridHeight + 150} fontSize="10" fill="#000">
                        Off Duty: {logData.totals.offDuty}h
                    </text>
                    <text x="250" y={gridTop + gridHeight + 150} fontSize="10" fill="#000">
                        Sleeper: {logData.totals.sleeperBerth}h
                    </text>
                    <text x="380" y={gridTop + gridHeight + 150} fontSize="10" fill="#000">
                        Driving: {logData.totals.driving}h
                    </text>
                    <text x="510" y={gridTop + gridHeight + 150} fontSize="10" fill="#000">
                        On Duty: {logData.totals.onDuty}h
                    </text>

                    {/* Driver signature line */}
                    <text x="700" y={gridTop + gridHeight + 150} fontSize="10" fill="#000">
                        Driver&apos;s Signature: _________________________
                    </text>
                </svg>
            </div>
        </div>
    );
}