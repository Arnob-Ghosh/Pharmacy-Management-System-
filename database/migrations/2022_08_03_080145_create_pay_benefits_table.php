<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayBenefitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pay_benefits', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('employee_id');
            $table->string('employee_name');
            $table->string('designation');
            $table->string('department');
            $table->string('benefit_name');
            $table->bigInteger('benefit_id');
            $table->double('amount');
            $table->string('year');
            $table->bigInteger('subscriber_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pay_benefits');
    }
}
